import { useState } from 'react';
import { ArrowUpRight, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { projects } from '@/lib/projects';

export function ProjectDialog({ selected, onChange }: { selected: number | null; onChange: (index: number | null) => void }) {
  const project = selected === null ? null : projects[selected];
  return <Dialog open={project !== null} onOpenChange={open => { if (!open) onChange(null); }}><DialogContent className="max-w-4xl w-[calc(100%-32px)] max-h-[90dvh] overflow-y-auto p-5 sm:p-7 rounded-2xl">
    {project && <><DialogTitle className="font-display text-3xl pr-8">{project.title}</DialogTitle><DialogDescription>{project.category}</DialogDescription><img src={project.image} alt={project.title} className="w-full h-[48dvh] object-contain rounded-lg bg-secondary" /><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center"><p className="text-sm leading-relaxed max-w-lg">{project.description}</p><div className="flex gap-1"><Button variant="outline" size="icon" aria-label="Previous project" onClick={() => onChange(((selected ?? 0) + projects.length - 1) % projects.length)}><ChevronLeft /></Button><Button variant="outline" size="icon" aria-label="Next project" onClick={() => onChange(((selected ?? 0) + 1) % projects.length)}><ChevronRight /></Button></div></div></>}
  </DialogContent></Dialog>;
}
export function ConsultationDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [saved, setSaved] = useState(false);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="w-[calc(100%-32px)] max-h-[90dvh] overflow-y-auto rounded-2xl p-7">
    <span className="eyebrow text-primary">A space that starts with you</span><DialogTitle className="font-display text-4xl">LET’S TALK<br />ABOUT YOUR SPACE.</DialogTitle><DialogDescription>Tell us a little about what you have in mind.</DialogDescription>
    <form className="space-y-4" onSubmit={event => { event.preventDefault(); const values = new FormData(event.currentTarget); const text = `ELYSIAN DESIGN STUDIO — PROJECT ENQUIRY\n\nName: ${values.get('name')}\nEmail: ${values.get('email')}\nProject: ${values.get('type')}\n\n${values.get('message')}`; const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' })); const link = document.createElement('a'); link.href = url; link.download = 'elysian-project-enquiry.txt'; link.click(); URL.revokeObjectURL(url); setSaved(true); }}>
      <label className="block text-xs font-medium">Your name<input className="form-field" name="name" autoComplete="name" placeholder="Full name" required /></label>
      <label className="block text-xs font-medium">Email address<input className="form-field" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      <label className="block text-xs font-medium">Project type<select className="form-field" name="type"><option>Residential interiors</option><option>Commercial interiors</option><option>Bespoke furniture</option><option>Full-space design</option></select></label>
      <label className="block text-xs font-medium">What are you imagining?<textarea className="form-field min-h-24" name="message" placeholder="Your space, your ideas, your timeline…" required /></label>
      <p className="text-xs text-muted-foreground">Online bookings are not open yet. You can save your enquiry below; it will not be sent to the studio.</p>
      <Button className="w-full rounded-full h-12" type="submit"><Download /> Save project enquiry <ArrowUpRight /></Button>
      {saved && <p role="status" className="text-sm text-primary">Your project enquiry has been downloaded.</p>}
    </form>
  </DialogContent></Dialog>;
}
