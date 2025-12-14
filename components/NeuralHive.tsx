
import React, { useEffect, useRef } from 'react';

interface AgentNode {
  id: string;
  x: number;
  y: number;
  role: string;
  status: 'idle' | 'working' | 'waiting';
}

interface NeuralHiveProps {
  agents: any[];
}

const NeuralHive: React.FC<NeuralHiveProps> = ({ agents }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Create stable node positions based on agent ID
    const nodes: AgentNode[] = agents.map((agent, i) => {
        // Distribute in a circle/orbit layout for "Hive" feel
        const angle = (i / agents.length) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.3;
        return {
            id: agent.id,
            x: width / 2 + Math.cos(angle) * radius,
            y: height / 2 + Math.sin(angle) * radius,
            role: agent.role,
            status: agent.workStatus || 'idle'
        };
    });

    // Central Node (The Brain/Supervisor)
    const centerNode = { x: width / 2, y: height / 2 };

    let frameId = 0;
    const packets: { from: {x:number, y:number}, to: {x:number, y:number}, progress: number, color: string }[] = [];

    // Animation Loop
    const render = () => {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Connections to Center (The Neural Web)
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(centerNode.x, centerNode.y);
            ctx.strokeStyle = node.status === 'working' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = node.status === 'working' ? 2 : 1;
            ctx.stroke();

            // Connecting ring between agents
            nodes.forEach(other => {
                const dist = Math.hypot(node.x - other.x, node.y - other.y);
                if (dist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        // 2. Spawn Data Packets randomly if working
        nodes.forEach(node => {
            if (node.status === 'working' && Math.random() > 0.92) {
                packets.push({
                    from: { x: node.x, y: node.y },
                    to: centerNode,
                    progress: 0,
                    color: '#6366f1' // Indigo
                });
            }
            if (node.status === 'working' && Math.random() > 0.92) {
                 packets.push({
                    from: centerNode,
                    to: { x: node.x, y: node.y },
                    progress: 0,
                    color: '#10b981' // Emerald
                });
            }
        });

        // 3. Draw Packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += 0.05; // Speed
            
            const curX = p.from.x + (p.to.x - p.from.x) * p.progress;
            const curY = p.from.y + (p.to.y - p.from.y) * p.progress;

            ctx.beginPath();
            ctx.arc(curX, curY, 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;

            if (p.progress >= 1) packets.splice(i, 1);
        }

        // 4. Draw Nodes
        nodes.forEach(node => {
            // Glow effect
            if (node.status === 'working') {
                const pulse = Math.sin(frameId * 0.1) * 5;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 20 + pulse, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
                ctx.fill();
            }

            // Core
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = node.status === 'working' ? '#6366f1' : '#3f3f46';
            ctx.fill();
            
            // Label
            ctx.fillStyle = '#a1a1aa';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(node.role.substring(0,12), node.x, node.y + 25);
        });

        // Draw Central Brain
        ctx.beginPath();
        ctx.arc(centerNode.x, centerNode.y, 30, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(centerNode.x, centerNode.y, 5, centerNode.x, centerNode.y, 30);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();

        frameId++;
        requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = canvasRef.current.clientWidth;
            canvasRef.current.height = canvasRef.current.clientHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [agents]);

  return (
    <div className="w-full h-[400px] bg-black/50 border border-white/10 rounded-2xl relative overflow-hidden mb-6 group">
        <div className="absolute top-4 left-4 text-xs font-mono text-zinc-500 uppercase tracking-widest z-10 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            NEURAL HIVE VIEW v3.0
        </div>
        <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default NeuralHive;
