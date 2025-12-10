
import React, { useEffect, useRef } from 'react';

const InteractiveNoise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let boids: Boid[] = [];
    let mouse = { x: width / 2, y: height / 2, active: false };

    // --- Configuration for "Realistic Migratory Birds" Feel ---
    const BOID_COUNT = 300; // Number of "birds"
    const MAX_SPEED = 5;
    const MAX_FORCE = 0.1;
    const PERCEPTION_RADIUS = 60; // How far they can see neighbors
    const MOUSE_RADIUS = 300; // How far they sense the mouse
    
    // Flocking Weights (The DNA of the movement)
    const SEPARATION_WEIGHT = 2.0; // Avoid crowding
    const ALIGNMENT_WEIGHT = 1.0;  // Steer same direction
    const COHESION_WEIGHT = 1.0;   // Steer towards center
    const MOUSE_ATTRACTION_WEIGHT = 3.0; // Desire to follow mouse

    class Vector {
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      add(v: Vector) { this.x += v.x; this.y += v.y; return this; }
      sub(v: Vector) { this.x -= v.x; this.y -= v.y; return this; }
      mult(n: number) { this.x *= n; this.y *= n; return this; }
      div(n: number) { this.x /= n; this.y /= n; return this; }
      mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
      
      normalize() {
        const m = this.mag();
        if (m !== 0) this.div(m);
        return this;
      }
      
      limit(max: number) {
        if (this.mag() > max) {
          this.normalize();
          this.mult(max);
        }
        return this;
      }
      
      static dist(v1: Vector, v2: Vector) {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }

    class Boid {
      position: Vector;
      velocity: Vector;
      acceleration: Vector;
      size: number;
      color: string;

      constructor(x: number, y: number) {
        this.position = new Vector(x, y);
        // Random initial velocity
        const angle = Math.random() * Math.PI * 2;
        this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
        this.acceleration = new Vector(0, 0);
        this.size = Math.random() * 2 + 1;
        // Tech-looking colors (White/Cyan/Indigo)
        const rand = Math.random();
        if (rand > 0.9) this.color = 'rgba(99, 102, 241, 0.8)'; // Indigo
        else if (rand > 0.8) this.color = 'rgba(16, 185, 129, 0.8)'; // Emerald
        else this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
      }

      edges() {
        if (this.position.x > width) this.position.x = 0;
        else if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        else if (this.position.y < 0) this.position.y = height;
      }

      align(boids: Boid[]) {
        let steering = new Vector(0, 0);
        let total = 0;
        for (let other of boids) {
          let d = Vector.dist(this.position, other.position);
          if (other !== this && d < PERCEPTION_RADIUS) {
            steering.add(other.velocity);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.normalize();
          steering.mult(MAX_SPEED);
          steering.sub(this.velocity);
          steering.limit(MAX_FORCE);
        }
        return steering;
      }

      cohesion(boids: Boid[]) {
        let steering = new Vector(0, 0);
        let total = 0;
        for (let other of boids) {
          let d = Vector.dist(this.position, other.position);
          if (other !== this && d < PERCEPTION_RADIUS) {
            steering.add(other.position);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.sub(this.position);
          steering.normalize();
          steering.mult(MAX_SPEED);
          steering.sub(this.velocity);
          steering.limit(MAX_FORCE);
        }
        return steering;
      }

      separation(boids: Boid[]) {
        let steering = new Vector(0, 0);
        let total = 0;
        for (let other of boids) {
          let d = Vector.dist(this.position, other.position);
          if (other !== this && d < PERCEPTION_RADIUS / 2) {
            let diff = new Vector(this.position.x, this.position.y);
            diff.sub(other.position);
            diff.normalize();
            diff.div(d); // Weight by distance
            steering.add(diff);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.normalize();
          steering.mult(MAX_SPEED);
          steering.sub(this.velocity);
          steering.limit(MAX_FORCE * 1.5); // Separation needs more urgency
        }
        return steering;
      }

      seekMouse() {
        if (!mouse.active) return new Vector(0, 0);
        
        let mousePos = new Vector(mouse.x, mouse.y);
        let d = Vector.dist(this.position, mousePos);
        
        if (d < MOUSE_RADIUS) {
          let desired = new Vector(mousePos.x, mousePos.y);
          desired.sub(this.position);
          desired.normalize();
          desired.mult(MAX_SPEED);
          
          let steer = new Vector(desired.x, desired.y);
          steer.sub(this.velocity);
          steer.limit(MAX_FORCE * 2);
          return steer;
        }
        return new Vector(0, 0);
      }

      flock(boids: Boid[]) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        let mouseForce = this.seekMouse();

        alignment.mult(ALIGNMENT_WEIGHT);
        cohesion.mult(COHESION_WEIGHT);
        separation.mult(SEPARATION_WEIGHT);
        mouseForce.mult(MOUSE_ATTRACTION_WEIGHT);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.add(mouseForce);
      }

      update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(MAX_SPEED);
        this.acceleration.mult(0); // Reset acceleration
        this.edges();
      }

      draw() {
        if (!ctx) return;
        
        // Draw triangular "Bird" shape oriented to velocity
        const angle = Math.atan2(this.velocity.y, this.velocity.x);
        
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.moveTo(this.size * 2, 0);
        ctx.lineTo(-this.size, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.closePath();
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
      }
    }

    const init = () => {
      boids = [];
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      for (let i = 0; i < BOID_COUNT; i++) {
        boids.push(new Boid(Math.random() * width, Math.random() * height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let boid of boids) {
        boid.flock(boids);
        boid.update();
        boid.draw();
      }
      
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    
    const handleMouseLeave = () => {
        mouse.active = false;
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init(); // Re-init to avoid stretching
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50" // High Z-index to be "On Top"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  );
};

export default InteractiveNoise;
