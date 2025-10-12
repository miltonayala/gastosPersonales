# 💰 Aplicación de Presupuesto Mensual

Solución al **Desafío Práctico 2** de la Experiencia de Aprendizaje 4 para la asignatura **Desarrollo de Aplicaciones Web con Software Interpretado en el Cliente [DAW901]**.

El objetivo es desarrollar una aplicación web que permita gestionar ingresos y egresos mensuales, calculando el porcentaje de gastos en función de los ingresos totales.

---

## 🎯 Contexto del Desafío

- **Asignatura:** DAW901 - Desarrollo de Aplicaciones Web con Software Interpretado en el Cliente
- **Carrera:** Técnico en Ingeniería en Computación
- **Institución:** Universidad Don Bosco, El Salvador (Dirección de Educación a Distancia)
- **Experiencia de Aprendizaje:** 4
- **Modalidad:** Grupal (5 integrantes)

---

## ✨ Requisitos Funcionales

La aplicación debe replicar el diseño propuesto y cumplir con los siguientes puntos, manejando los datos a través de Objetos JavaScript:

### A. Título y Balance General

- **Título Dinámico:** Refleja el mes y año actuales (ejemplo: Presupuesto de octubre 2024).
- **Monto Total Disponible:** Suma de todos los ingresos menos la suma de todos los egresos.
- **Resumen de Transacciones:** Muestra la suma total de ingresos y egresos.
- **Redondeo:** Utiliza `toFixed(2)` para redondear cifras monetarias.
- **Porcentaje de Gastos:** Calcula el porcentaje total de gastos respecto a los ingresos.

### B. Sección de Transacción (Formulario)

- **Dropdown:** Opciones: Ingreso y Egreso.
- **Descripción:** Campo de texto libre.
- **Monto:** Solo acepta valores numéricos.
- **Persistencia:** Las transacciones aparecen en la lista correspondiente.

### C. Sección de Detalles (Lista de Transacciones)

- **Pestañas:** Dos pestañas: Ingresos y Egresos.
- **Tab "Ingresos":** Muestra descripción y monto.
- **Tab "Egresos":** Muestra descripción, monto y porcentaje de gasto individual.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología    | Observaciones                                                        |
|---------------|---------------------------------------------------------------------|
| JavaScript    | Sin librerías ni frameworks externos. Lógica pura.                  |
| HTML5         | Estructura semántica del documento.                                 |
| CSS3          | Estilización del diseño.                                            |
| Tailwind CSS  | Para estilos rápidos y diseño responsivo.                           |
| Bootstrap 3/4 | Opcional, para componentes UI como alternativa a Tailwind.          |

---

## 📋 Rúbrica de Evaluación

| Criterio                   | Descripción                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| 1. Diseño                  | Se respeta el diseño propuesto.                                             |
| 2. Tecnologías             | Uso de tecnologías propuestas.                                              |
| 3. Validaciones            | Manejo de errores de usuario.                                               |
| 4. Cálculos de datos       | Funciones para cálculo de mes, presupuesto y porcentaje de egreso.          |
| 5. Interfaz                | Montos totales calculados y mostrados correctamente.                        |
| 6. Detalles de transacciones| Cálculo correcto de porcentajes de detalle de egresos.                     |
| 7. Uso de Objetos          | Uso apropiado de objetos en JavaScript.                                     |
| 8. Buenas prácticas        | Buenas prácticas de programación y uso de variables.                        |
| 9. Comentarios             | Comentarios que facilitan la comprensión del código.                        |
| 10. Experiencia de usuario | Experiencia satisfactoria y sin errores.                                    |

- **Puntaje Individual:** Suma total de puntos obtenidos en los criterios 1-10.
- **Calificación:** Nota final del desafío.

---
