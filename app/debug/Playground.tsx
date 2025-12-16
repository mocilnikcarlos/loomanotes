"use client";

import { LogoutButton } from "@/components/auth/logout/ui/LogoutButton";
import { useT } from "@/hooks/utils/useT";
import { addToast } from "@heroui/react";
import { Button } from "@/components/ui/Button";
import { Eye, Search, X, Trash, Edit } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/layout/Section";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/Modal";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { Badge } from "@/components/ui/Badge";
import { Header } from "@/components/ui/Header";

export default function Playground() {
  const { t } = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section>
      <Card rounded="4xl">
        <div className=" flex flex-col items-center gap-4">
          <Header size="h1" title="Contenido de la card" />
          <Header size="h2" title="Contenido de la card" />
          <Header size="h3" title="Contenido de la card" />
          <Header
            size="h1"
            title="Contenido de la card"
            subtitle="Con subtitulo"
          />
          <Header
            size="h2"
            title="Contenido de la card"
            subtitle="Con subtitulo"
          />
          <Header
            size="h3"
            title="Contenido de la card"
            subtitle="Con subtitulo"
          />
          <span>{t("dashboard.hello")}</span>
        </div>
        <LogoutButton />

        <div className="flex flex-col gap-4 items-center justify-center w-full">
          {/* LG */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Button size="lg" variant="primary">
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="ghost">
              Ghost
            </Button>
            <Button size="lg" variant="brand">
              Secondary
            </Button>
          </div>

          {/* MD */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Button size="md" variant="primary">
              Primary
            </Button>
            <Button size="md" variant="secondary">
              Secondary
            </Button>
            <Button size="md" variant="ghost">
              Ghost
            </Button>
            <Button size="md" variant="brand">
              Ghost
            </Button>
          </div>

          {/* SM */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
            <Button size="sm" variant="brand">
              Ghost
            </Button>
          </div>

          {/* ICONS */}
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="flex gap-4">
              <Button size="md" variant="primary" icon={<X size={16} />} />
              <Button size="md" variant="secondary" icon={<X size={16} />} />
              <Button size="md" variant="ghost" icon={<X size={16} />} />
              <Button size="md" variant="brand" icon={<X size={16} />} />
            </div>
          </div>
        </div>
        {/* TOAST */}
        <Button
          variant="ghost"
          onClick={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
            })
          }
        >
          Toast
        </Button>
        {/* ICONS */}
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div className="flex gap-4 items-center justify-center w-full">
            <ButtonIcon variant="primary" size="lg" icon={<X size={16} />} />
            <ButtonIcon variant="secondary" size="lg" icon={<X size={16} />} />
            <ButtonIcon variant="ghost" size="lg" icon={<X size={16} />} />
            <ButtonIcon variant="brand" size="lg" icon={<X size={16} />} />
          </div>
          <div className="flex gap-4 items-center justify-center w-full">
            <ButtonIcon variant="primary" size="md" icon={<X size={16} />} />
            <ButtonIcon variant="secondary" size="md" icon={<X size={16} />} />
            <ButtonIcon variant="ghost" size="md" icon={<X size={16} />} />
            <ButtonIcon variant="brand" size="md" icon={<X size={16} />} />
          </div>
          <div className="flex gap-4 items-center justify-center w-full">
            <ButtonIcon variant="primary" size="sm" icon={<X size={16} />} />
            <ButtonIcon variant="secondary" size="sm" icon={<X size={16} />} />
            <ButtonIcon variant="ghost" size="sm" icon={<X size={16} />} />
            <ButtonIcon variant="brand" size="sm" icon={<X size={16} />} />
          </div>
        </div>
        {/* Pills */}
        <div className="flex flex-col gap-4 items-center justify-center w-full pt-6">
          {/* MD */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Pill>Updated 2h ago</Pill>
            <Pill
              leading={<span className="h-2 w-2 rounded-full bg-success" />}
            >
              Active
            </Pill>
            <Pill leading={<X size={12} />}>With icon</Pill>
          </div>

          {/* SM */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Pill size="sm">Updated 2h ago</Pill>
            <Pill
              size="sm"
              leading={<span className="h-1.5 w-1.5 rounded-full bg-success" />}
            >
              Active
            </Pill>
            <Pill size="sm" leading={<X size={10} />}>
              With icon
            </Pill>
          </div>

          {/* Dynamic / component */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Pill
              leading={<span className="h-2 w-2 rounded-full bg-success" />}
            >
              Rendering…
            </Pill>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full pt-6">
          <Input inputSize="sm" placeholder="placeholder" />
          <Input
            inputSize="sm"
            placeholder="placeholder"
            error
            helperText="auth.invalidEmail"
          />
          <Input
            inputSize="md"
            type="password"
            placeholder="auth.password"
            legend="auth.passwordLabel"
            rightIconButton={{
              icon: <Eye size={16} />,
              onClick: () => {},
            }}
          />
          <Input
            inputSize="md"
            placeholder="placeholder"
            leftIcon={<Search size={14} />}
          />
        </div>
      </Card>
      <Card rounded="4xl">
        OTRO CONTENIDO CARD
        <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
          Abrir modal
        </Button>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader title="Titulo modal"></ModalHeader>
          <ModalBody>
            <Input inputSize="sm" placeholder="placeholder" />
            <Input
              inputSize="sm"
              placeholder="placeholder"
              error
              helperText="auth.invalidEmail"
            />
            <Input
              inputSize="md"
              type="password"
              placeholder="auth.password"
              legend="auth.passwordLabel"
              rightIconButton={{
                icon: <Eye size={16} />,
                onClick: () => {},
              }}
            />
            <Input
              inputSize="md"
              placeholder="placeholder"
              leftIcon={<Search size={14} />}
            />
          </ModalBody>
          <ModalFooter cancelText="Cancelar" confirmText="Confirmar" />
        </Modal>
        <Menu
          position="top"
          trigger={<Button variant="ghost">Acciones</Button>}
        >
          <MenuItem icon={<Edit size={14} />}>Editar</MenuItem>
          <MenuItem icon={<Trash size={14} />}>Eliminar</MenuItem>
        </Menu>
        <Menu
          openOn="context"
          position="right"
          trigger={
            <div className="h-20 w-40 border rounded-xl bg-primary text-foreground-secondary">
              Click derecho aquí
            </div>
          }
        >
          <MenuItem>Copiar</MenuItem>
          <MenuItem>Pegar</MenuItem>
        </Menu>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Badge status="success" showIcon>
              Active
            </Badge>

            <Badge status="warning" showIcon>
              Pending
            </Badge>

            <Badge status="danger" showIcon>
              Failed
            </Badge>

            <Badge status="info" showIcon>
              Draft
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Badge status="success">Active</Badge>

            <Badge status="warning">Pending</Badge>

            <Badge status="danger">Failed</Badge>

            <Badge status="info">Draft</Badge>
          </div>
        </div>
      </Card>
    </Section>
  );
}
