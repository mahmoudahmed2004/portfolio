"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/shell/section-heading";
import type { PortfolioCertificate } from "@/lib/portfolio-data";

type CertificateGalleryProps = {
  certificates: PortfolioCertificate[];
};

export function CertificateGallery({
  certificates,
}: CertificateGalleryProps) {
  const [selected, setSelected] = useState<PortfolioCertificate | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open && typeof dialog.close === "function") {
      dialog.close();
    }

    setSelected(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeDialog, selected]);

  const openCertificate = (
    certificate: PortfolioCertificate,
    trigger: HTMLButtonElement,
  ) => {
    triggerRef.current = trigger;
    setSelected(certificate);
  };

  return (
    <section
      id="certificates"
      className="section-shell certificate-gallery"
      aria-labelledby="certificates-title"
    >
      <span className="section-index" aria-hidden="true">
        04
      </span>
      <SectionHeading
        id="certificates-title"
        eyebrow="Verified learning"
        title="Certificates"
        description="Three original credentials, paired with lighter web previews for a closer look."
      />

      <ul className="certificate-gallery__grid">
        {certificates.map((certificate) => (
          <li key={certificate.slug}>
            <button
              className="certificate-card focus-ring"
              type="button"
              aria-label={`Open ${certificate.title} certificate`}
              onClick={(event) =>
                openCertificate(certificate, event.currentTarget)
              }
            >
              <span className="certificate-card__image">
                <Image
                  src={certificate.image}
                  alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                  fill
                  sizes="(min-width: 64rem) 29vw, (min-width: 42rem) 45vw, 92vw"
                />
              </span>
              <span className="certificate-card__meta">
                <span className="certificate-card__year">{certificate.year}</span>
                <strong>{certificate.title}</strong>
                <span>{certificate.issuer}</span>
              </span>
              <span className="certificate-card__action" aria-hidden="true">
                Inspect credential <span>↗</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <dialog
          ref={dialogRef}
          className="certificate-dialog"
          aria-labelledby={`certificate-dialog-${selected.slug}`}
          onCancel={(event) => {
            event.preventDefault();
            closeDialog();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog();
            }
          }}
        >
          <div className="certificate-dialog__panel">
            <button
              className="certificate-dialog__close focus-ring"
              type="button"
              onClick={closeDialog}
              autoFocus
            >
              Close
              <span aria-hidden="true">×</span>
            </button>
            <div className="certificate-dialog__image">
              <Image
                src={selected.image}
                alt={`${selected.title} certificate issued by ${selected.issuer}`}
                fill
                sizes="(min-width: 64rem) 70vw, 92vw"
                priority
              />
            </div>
            <div className="certificate-dialog__copy">
              <div>
                <p className="eyebrow">
                  <span>{selected.issuer}</span>{" "}
                  <span aria-hidden="true">·</span>{" "}
                  <span>{selected.year}</span>
                </p>
                <h3 id={`certificate-dialog-${selected.slug}`}>
                  {selected.title}
                </h3>
                <p>{selected.detail}</p>
              </div>
              <a
                className="certificate-dialog__original focus-ring"
                href={selected.original}
                target="_blank"
                rel="noreferrer"
              >
                Open original file
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </dialog>
      ) : null}
    </section>
  );
}
