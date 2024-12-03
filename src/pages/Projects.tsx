import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    name: 'Website Redesign',
    status: 'In Progress',
    progress: 75,
    dueDate: '2024-04-01',
  },
  {
    name: 'Mobile App',
    status: 'Planning',
    progress: 25,
    dueDate: '2024-05-15',
  },
  {
    name: 'Marketing Campaign',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-03-20',
  },
];

export default function Projects() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <p className="text-muted-foreground">
          Manage and track your ongoing projects.
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{project.name}</CardTitle>
                <Badge
                  variant={
                    project.status === 'Completed'
                      ? 'default'
                      : project.status === 'In Progress'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardDescription>Due: {project.dueDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Progress: {project.progress}%
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}