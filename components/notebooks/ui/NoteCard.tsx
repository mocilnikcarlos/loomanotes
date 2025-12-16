"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";
import { Pill } from "@/components/ui/Pill";
import { Header } from "@/components/ui/Header";
import { Calendar, Share2 } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

interface NoteCardProps {
  id: string;
  title: string;
  created_at: string;
  highlighted?: boolean;
}

export function NoteCard({
  id,
  title,
  created_at,
  highlighted,
}: NoteCardProps) {
  return (
    <Link href={`/dashboard/note/${id}`} className="block">
      <Card
        rounded="xl"
        className={cn(
          "h-full cursor-pointer transition-colors",
          "hover:bg-card-hover hover:border-primary",
          highlighted && "animate-brand-flash"
        )}
      >
        <div className="flex h-full flex-col gap-3">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <Pill leading={<Calendar size={12} />} size="sm">
              {new Date(created_at).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Pill>

            <ButtonIcon
              icon={<Share2 size={16} />}
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </div>

          {/* Title */}
          <Header title={title} size="h4" className="line-clamp-2" />
        </div>
      </Card>
    </Link>
  );
}
