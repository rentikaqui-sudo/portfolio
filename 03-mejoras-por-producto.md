# Mejoras por producto (priorizado)

Orden sugerido de inversión de tiempo: **mayor impacto en credibilidad y venta** primero.

---

## 1. Mi Asistente Financiero

**Quick wins**

- Unificar la **historia técnica** en documentación (un solo relato de pipeline y despliegue — evitar contradicciones entre README histórico y cómo corre hoy).
- **README público** en GitHub: problema, diagrama simple del flujo, capturas de Telegram/Sheets (sin datos reales).
- Video **Loom** de 2 minutos: del correo a la fila en Sheets + caso de “baja confianza” por Telegram.

**Mediano plazo**

- Política **explícita de privacidad** y alcance (OAuth, qué se guarda, qué no) para poder hablar con terceros o un contador.
- Opción de “modo demo” con datos sintéticos para enseñar sin exponer cuentas reales.

**Para vender / trasladar a otros**

- Empaquetar como **plantilla parametrizable** (nombres de pestañas, categorías, bancos soportados) con onboarding guiado.

---

## 2. Selvato Dashboard

**Quick wins**

- **Screenshots** de módulos clave (inicio, ventas, inventario) para LinkedIn y README.
- Completar **README** del repo: marca, usuarios objetivo, qué está en mock y qué falta para APIs reales.

**Mediano plazo**

- Conectar **una sola fuente real** (por ejemplo Shopify **solo lectura** o inventario) para pasar de “demo interna” a **piloto con datos verdaderos**.
- Deploy demo en **Vercel** (o similar) con URL compartible y datos mock si no hay API todavía.

**Para vender**

- Dos páginas de storytelling: **dueño de marca** (qué ve cada mañana) y **operaciones** (inventario/alertas).

---

## 3. QPC (club de pádel)

**Quick wins**

- Capturas del flujo en Telegram + ejemplo de fila en Sheets.
- Mini **manual del tesorero** (una página).

**Mediano**

- Rol solo lectura o export mensual PDF si el club lo pide.

---

## 4. Mi asistente personal (WhatsApp / Hermes)

**Quick wins**

- Tratarlo explícitamente como **experimental** en cualquier CV frente a clientes.

**Mediano**

- Solo vale empacarlo como producto si defines **un caso repetible** (ej. recordatorios + agenda para un tipo de profesional).

---

## Resumen

| Proyecto            | Prioridad comunicación | Prioridad técnica siguiente paso        |
|---------------------|------------------------|----------------------------------------|
| Asistente financiero | Alta                   | README + video + narrativa única       |
| Selvato Dashboard      | Alta                   | Screenshots + 1 API o demo publicada   |
| QPC                    | Media                  | Evidencia de uso real                  |
| Asistente personal     | Baja (experimental)    | Definir caso repetible o dejar como R&D |
