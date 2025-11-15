// app/courses/page.jsx
"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, GraduationCap, Bookmark, CheckCircle2, X, CalendarCheck, Send, Search, Filter, ChevronDown, Play, Users, Clock, Award, RefreshCw } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext';

// Course data in Spanish (original)
const courseDataEs = {
  "Ruta de Competencias Digitales": {
    "Python": [
      {
        "course_image": "assets/courses/Python-Programming.jpg",
        "name": "Desarrollo de Modelos de Aprendizaje Automático con Python",
        "description": "Capacita a los estudiantes en la creación, entrenamiento y evaluación de modelos de aprendizaje automático con Python, abarcando clasificación, regresión y agrupación, optimización de modelos y selección de características mediante bibliotecas como scikit-learn, validación cruzada y ajuste de hiperparámetros.",
        "career": ["Ingeniería de Datos", "Científico de Datos", "Analista de Datos", "Desarrollador de Machine Learning"]
      },
      {
        "course_image": "assets/courses/how-is-python-used-in-finance.png",
        "name": "Analizar Datos Financieros con Python",
        "description": "Proporciona habilidades para análisis estadístico, modelado financiero y visualización de datos financieros con Python, utilizando bibliotecas como Pandas y NumPy para manipulación y análisis.",
        "career": ["Analista Financiero", "Analista de Riesgos", "Consultor Financiero", "Científico de Datos Financieros"]
      },
      {
        "course_image": "assets/courses/chatbot-4071274_1920.jpg",
        "name": "Desarrollo de Chatbots con Python",
        "description": "Enfocado en procesamiento de lenguaje natural (NLP) y desarrollo de interfaces conversacionales con bibliotecas como NLTK, spaCy, ChatterBot y Rasa.",
        "career": ["Desarrollador de Chatbots", "Ingeniero de Automatización de Conversaciones", "Especialista en Interfaz de Usuario Conversacional"]
      },
      {
        "course_image": "assets/courses/1_XzIRJGujfqAiOV2EIQgR_Q.png",
        "name": "Construir Aplicaciones Web con Python y Flask",
        "description": "Desarrollo de aplicaciones web con Flask, incluyendo arquitectura web, rutas, formularios, bases de datos con SQLAlchemy, autenticación y APIs RESTful.",
        "career": ["Desarrollador Web", "Ingeniero de Software", "Desarrollador de Aplicaciones Python", "Desarrollador Backend"]
      },
      {
        "course_image": "assets/courses/1_E6jhcyx5k-18j5Aadq4FTg.png",
        "name": "Construir Modelos de Aprendizaje Profundo con Tensorflow",
        "description": "Construcción de modelos de aprendizaje profundo con TensorFlow, incluyendo redes neuronales, optimización, transferencia de aprendizaje y aplicaciones en visión por computadora y NLP.",
        "career": ["Ingeniero de Machine Learning", "Científico de Datos", "Desarrollador de Inteligencia Artificial", "Investigador en Deep Learning"]
      },
      {
        "course_image": "assets/courses/natural-language-processing-nlp.png",
        "name": "Aplicar Procesamiento de Lenguaje Natural con Python",
        "description": "Aplicación de técnicas de PLN como análisis de sentimientos, extracción de entidades y traducción automática con bibliotecas como NLTK, spaCy y transformers.",
        "career": ["Ingeniero de PLN", "Desarrollador de Aplicaciones de Procesamiento de Lenguaje Natural", "Científico de Datos en PLN"]
      },
      {
        "course_image": "assets/courses/python-django-1024x576.webp",
        "name": "Construir Aplicaciones Web con Python y Django",
        "description": "Desarrollo de aplicaciones web con Django, incluyendo estructura de proyectos, modelos, bases de datos, autenticación y gestión de permisos.",
        "career": ["Desarrollador Full Stack", "Ingeniero de Software Web", "Desarrollador Django", "Arquitecto de Aplicaciones Web"]
      },
      {
        "course_image": "assets/courses/What-is-data-science-2.jpg",
        "name": "Ingeniería de Software para Científicos de Datos",
        "description": "Aplicación de principios de ingeniería de software en ciencia de datos, incluyendo estructuración de proyectos, buenas prácticas, colaboración y pipelines de datos.",
        "career": ["Ingeniero de Software para Ciencia de Datos", "Desarrollador de Software Científico", "Ingeniero de Datos", "Científico de Datos"]
      },
      {
        "course_image": "assets/courses/maxresdefault.jpg",
        "name": "Aprendizaje Automático",
        "description": "Visión general de aprendizaje automático, algoritmos supervisados y no supervisados, evaluación de modelos y aplicaciones reales.",
        "career": ["Científico de Datos", "Ingeniero de Machine Learning", "Analista de Datos", "Desarrollador de Algoritmos de Aprendizaje Automático"]
      },
      {
        "course_image": "assets/courses/1_ocaE5pTwxGuXKUhfalFuIw.jpg",
        "name": "Fundamentos de Aprendizaje Automático e Inteligencia Artificial",
        "description": "Introducción a fundamentos de ML e IA, incluyendo clasificación, regresión, agrupación, aprendizaje supervisado/no supervisado, ética e interpretabilidad.",
        "career": ["Estudiantes", "Principiantes en Ciencia de Datos", "Desarrolladores que buscan entender los principios básicos de IA y ML"]
      },
      {
        "course_image": "assets/courses/115972543-04513e80-a51d-11eb-8466-5f460b3cb1e0.png",
        "name": "Analizar y Visualizar Datos con Python",
        "description": "Análisis y visualización de datos con Python, utilizando Pandas, Matplotlib, Seaborn y creación de dashboards interactivos.",
        "career": ["Analista de Datos", "Científico de Datos", "Consultor de Visualización de Datos", "Desarrollador de Business Intelligence"]
      }
    ],
    "JavaScript": [
      {
        "course_image": "assets/courses/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_sk3vdofe7r7r5wax1scb.webp",
        "name": "Crear una Aplicación Web Avanzada con React y Redux",
        "description": "Desarrollo de aplicaciones web avanzadas con React y Redux, componentes reutilizables, manejo de estado y optimización de rendimiento.",
        "career": ["Desarrollador Frontend", "Ingeniero de Software Web", "Desarrollador de Aplicaciones React", "Especialista en Interfaz de Usuario"]
      },
      {
        "course_image": "assets/courses/course_1674371266.jpg",
        "name": "Crear una Aplicación Front-End con React",
        "description": "Fundamentos de React para construir interfaces interactivas, manejo de componentes y estado.",
        "career": ["Desarrollador Frontend", "Diseñador de Interfaz de Usuario", "Desarrollador de Interfaces de Usuario", "Especialista en Experiencia de Usuario (UX)"]
      },
      {
        "course_image": "assets/courses/Best-Backend-for-React-JS.webp",
        "name": "Crear una Aplicación Back-End con JavaScript",
        "description": "Construcción de aplicaciones back-end con JavaScript, manejo de servidores, rutas y bases de datos para desarrollo full stack.",
        "career": ["Desarrollador Backend", "Ingeniero de Software", "Arquitecto de Software", "Desarrollador Full Stack"]
      },
      {
        "course_image": "assets/courses/1623061726595_1.avif",
        "name": "Crear un Videojuego con Phaser.js",
        "description": "Desarrollo de videojuegos 2D con Phaser.js, gráficos, lógica de juego y optimización para experiencias interactivas.",
        "career": ["Desarrollador de Videojuegos", "Diseñador de Juegos", "Ingeniero de Software de Entretenimiento", "Desarrollador de Experiencia de Usuario para Juegos"]
      }
    ],
    "HTML & CSS": [
      {
        "course_image": "assets/courses/67ff6ed197440c001def433d.jpg",
        "name": "Construir un Sitio Web con HTML, CSS y GitHub Pages",
        "description": "Introducción a HTML y CSS para sitios web estáticos, con hospedaje en GitHub Pages para colaboración y despliegue.",
        "career": ["Desarrollador Web", "Diseñador Web", "Especialista en Desarrollo Frontend", "Ingeniero de Sitios Web"]
      }
    ],
    "SQL": [
      {
        "course_image": "assets/courses/What_is_SQL_Database.png",
        "name": "Analizar Datos con SQL",
        "description": "Uso de SQL para consultas complejas, joins, agregaciones y análisis en bases de datos relacionales.",
        "career": ["Analista de Datos", "Ingeniero de Datos", "Científico de Datos", "Consultor de Bases de Datos"]
      },
      {
        "course_image": "assets/courses/PostgreSQL.jpg",
        "name": "Diseñar Bases de Datos con PostgreSQL",
        "description": "Diseño de bases de datos con PostgreSQL, modelado de datos, relaciones y optimización de rendimiento.",
        "career": ["Diseñador de Bases de Datos", "Ingeniero de Datos", "Administrador de Bases de Datos", "Desarrollador Backend"]
      }
    ],
    "Java": [
      {
        "course_image": "assets/courses/Learn-Java-For-Android-App-Development-FREE.png",
        "name": "Construir Aplicaciones Android con Java",
        "description": "Desarrollo de aplicaciones Android con Java, interfaces de usuario, manejo de eventos y funciones específicas de Android.",
        "career": ["Desarrollador de Aplicaciones Android", "Ingeniero de Software Móvil", "Desarrollador Java", "Especialista en Desarrollo de Aplicaciones Móviles"]
      },
      {
        "course_image": "assets/courses/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_wz4lrwt4l98m3q9l97fg.webp",
        "name": "Crear APIs REST con Spring y Java",
        "description": "Creación de APIs RESTful con Spring y Java para servicios web escalables y eficientes.",
        "career": ["Desarrollador de APIs", "Ingeniero de Software", "Arquitecto de Software", "Desarrollador Java"]
      }
    ],
    "C": [
      {
        "course_image": "assets/courses/1679804058550.jpeg",
        "name": "Aprender el Lenguaje de Programación C",
        "description": "Introducción al lenguaje C, estructuras de control, funciones y manipulación de memoria para conceptos fundamentales de programación.",
        "career": ["Programador C", "Desarrollador de Software de Sistemas", "Ingeniero de Software Embebido", "Programador de Sistemas Operativos"]
      }
    ],
    "R": [
      {
        "course_image": "assets/courses/Rprogramming.jpg",
        "name": "Analizar Data con R",
        "description": "Análisis de datos y visualización con R, incluyendo análisis estadísticos, gráficos y paquetes especializados.",
        "career": ["Analista de Datos", "Científico de Datos", "Investigador en Estadísticas", "Consultor de Datos"]
      }
    ],
    "PHP": [
      {
        "course_image": "assets/courses/php_course.png",
        "name": "Aprender PHP",
        "description": "Introducción a PHP para desarrollo web del lado del servidor, sitios dinámicos, interacción con bases de datos y aplicaciones web.",
        "career": ["Desarrollador Backend", "Ingeniero de Software Web", "Desarrollador PHP", "Especialista en Desarrollo de Aplicaciones Web"]
      }
    ],
    "Swift": [
      {
        "course_image": "assets/courses/swift_programming.png",
        "name": "Desarrollar Aplicaciones iOS con SwiftUI",
        "description": "Desarrollo de aplicaciones iOS con SwiftUI, enfoque declarativo para interfaces de usuario en dispositivos Apple.",
        "career": ["Desarrollador de Aplicaciones iOS", "Ingeniero de Software Móvil", "Desarrollador Swift", "Especialista en Desarrollo de Aplicaciones para Dispositivos Apple"]
      }
    ],
    "Excel & Power BI": [
      {
        "course_image": "assets/courses/K2un32dRwCDR7KcVnooD_Excel+for+Biz+Analysts.jpg",
        "name": "Excel Avanzado para Análisis de Datos Empresariales",
        "description": "Uso avanzado de Excel para análisis de datos empresariales, fórmulas complejas, tablas dinámicas y herramientas para decisiones informadas.",
        "career": ["Analista de Datos Empresariales", "Especialista en Excel", "Consultor de Datos Empresariales", "Analista Financiero"]
      },
      {
        "course_image": "assets/courses/excel-automatation.png",
        "name": "Automatización y Eficiencia con Macros en Excel",
        "description": "Automatización de tareas repetitivas con macros en Excel para aumentar eficiencia y reducir errores.",
        "career": ["Especialista en Automatización en Excel", "Analista de Procesos", "Ingeniero de Datos", "Consultor de Eficiencia en Tareas Empresariales"]
      },
      {
        "course_image": "assets/courses/0-7PYW_0c0WGfrJ1NK.png",
        "name": "Power Query y Power Pivot en Excel: Transformación de Datos",
        "description": "Transformación y análisis de datos con Power Query y Power Pivot, modelos avanzados y extracción de información de conjuntos extensos.",
        "career": ["Analista de Datos", "Especialista en Transformación de Datos", "Ingeniero de Datos", "Consultor de Análisis Predictivo"]
      },
      {
        "course_image": "assets/courses/predictive-analytics-excel-spreadsheet-template.png",
        "name": "Análisis Predictivo con Excel",
        "description": "Aplicación de técnicas predictivas en Excel, funciones estadísticas, modelos y pronósticos basados en datos históricos.",
        "career": ["Analista de Datos", "Científico de Datos", "Analista de Negocios", "Consultor de Análisis Predictivo"]
      },
      {
        "course_image": "assets/courses/power-BI.jpeg",
        "name": "Visualización de Datos Efectiva con Power BI",
        "description": "Creación de informes visuales efectivos con Power BI, conexión de datos, paneles interactivos y comunicación mediante gráficos.",
        "career": ["Analista de Datos", "Especialista en Visualización de Datos", "Consultor de Business Intelligence", "Científico de Datos"]
      }
    ]
  },
  "Cursos Tecnológicos": [
    {
      "course_image":"assets/courses/maxresdefault (1).jpg",
      "name": "Power BI Nivel 1 – Fundamentos*",
      "description": "Fundamentos de Power BI para principiantes.",
      "career": []
    },
    {
      "course_image":"assets/courses/maxresdefault (2).jpg",
      "name": "Power BI Nivel 2 - Análisis Avanzado*",
      "description": "Análisis avanzado con Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/1_CCC980MBGyZJvMLfj0AaPw.png",
      "name": "Limpieza y Análisis de Datos con Power BI",
      "description": "Técnicas de limpieza y análisis de datos usando Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/1720283550631.png",
      "name": "Power BI para Finanzas",
      "description": "Aplicación de Power BI en el ámbito financiero.",
      "career": []
    },
    {
      "course_image":"assets/courses/Power-bi-kpi-1.jpg.webp",
      "name": "Power BI para Indicadores de Gestión (KPIs)",
      "description": "Uso de Power BI para monitorear KPIs.",
      "career": []
    },
    { 
      "course_image":"assets/courses/microsoft-excel-office365-tecnozero.webp",
      "name": "Excel Básico*",
      "description": "Conceptos básicos de Excel.",
      "career": []
    },
    {

      "course_image":"assets/courses/Microsoft-Excel-Intermediate.avif",
      "name": "Excel Intermedio*",
      "description": "Nivel intermedio de Excel.",
      "career": []
    },
    {
      "course_image":"assets/courses/advExcel.png",
      "name": "Excel Avanzado*",
      "description": "Técnicas avanzadas en Excel.",
      "career": []
    },
    {
      "course_image":'assets/courses/1_57YDg0EsnSBYsTnwYPkSDg.jpg',
      "name": "Introducción a la Inteligencia Artificial",
      "description": "Introducción a los conceptos de IA.",
      "career": []
    },
    {
      "course_image":"assets/courses/1663520031829.jpg",
      "name": "Inteligencia Artificial Aplicada a los Negocios",
      "description": "Aplicaciones de IA en entornos empresariales.",
      "career": []
    },
    {
      "course_image":"assets/courses/machine-learning-python.jpg",
      "name": "Machine Learning con Python",
      "description": "Aprendizaje automático utilizando Python.",
      "career": []
    },
    {
      "course_image":"assets/courses/Data-Science-2.jpg",
      "name": "Introducción a la Ciencia de Datos",
      "description": "Fundamentos de la ciencia de datos.",
      "career": []
    },
    {
      "course_image":"assets/courses/base-de-datos-sql.jpg",
      "name": "Fundamentos de Bases de Datos y SQL",
      "description": "Bases de datos y consultas SQL básicas.",
      "career": []
    },
    {
      "course_image":"assets/courses/semiconductores-1.webp",
      "name": "Semiconductores y su Aplicación en Tecnologías Modernas",
      "description": "Estudio de semiconductores y sus usos modernos.",
      "career": []
    },
    {
      "course_image":"assets/courses/Sicop-administracion-publica.webp",
      "name": "Contratación Pública en Costa Rica: Marco Legal y Uso de SICOP",
      "description": "Marco legal y uso del sistema SICOP en Costa Rica.",
      "career": []
    }
  ],
  "Cursos de Habilidades Blandas": [
    {
      "course_image":"assets/courses/comunicacion.jpg",
      "name": "Comunicación Efectiva",
      "description": "Mejora de habilidades de comunicación.",
      "career": []
    },
    {
      "course_image":"assets/courses/images (1).jpeg",
      "name": "Inteligencia Emocional en el Trabajo",
      "description": "Gestión de emociones en el entorno laboral.",
      "career": []
    },
    {
      "course_image":"assets/courses/large_colaboracion.jpg",
      "name": "Trabajo en Equipo y Colaboración",
      "description": "Técnicas para trabajar en equipo.",
      "career": []
    },
    {
      "course_image":"assets/courses/image-63.png",
      "name": "Liderazgo y Gestión de Equipos",
      "description": "Habilidades de liderazgo y gestión.",
      "career": []
    },
    {
      "course_image":"assets/courses/postRRSS-noticia-Febrero-Pensamiento-critico-horizontal.jpg",
      "name": "Pensamiento Crítico y Resolución de Problemas",
      "description": "Desarrollo de pensamiento crítico.",
      "career": []
    },
    {
      "course_image":"assets/courses/LinkedIn-13.png",
      "name": "Gestión del Tiempo y Productividad",
      "description": "Estrategias para gestionar el tiempo.",
      "career": []
    },
    {
      "course_image":"assets/courses/adaptabilidad-al-cambio.png",
      "name": "Adaptabilidad al Cambio",
      "description": "Adaptación a cambios en el entorno.",
      "career": []
    },
    {
      "course_image":"assets/courses/creatividad-innovacion.jpg",
      "name": "Creatividad e Innovación",
      "description": "Fomento de la creatividad.",
      "career": []
    },
    {
      "course_image":"assets/courses/skills-negociacion.jpg",
      "name": "Habilidades de Negociación",
      "description": "Técnicas de negociación efectiva.",
      "career": []
    },
    {
      "course_image":"assets/courses/La-empatia-en-las-relaciones-.jpg",
      "name": "Empatía y Relaciones Interpersonales",
      "description": "Desarrollo de empatía y relaciones.",
      "career": []
    },
    {
      "course_image":"assets/courses/shutterstock-61962856.jpg",
      "name": "Ética Profesional y Responsabilidad",
      "description": "Principios éticos en el trabajo.",
      "career": []
    },
    {
      "course_image":"assets/courses/Esucha-activa-y-feedback-constructivo-e1735042042743.jpg",
      "name": "Escucha Activa y Feedback Constructivo",
      "description": "Mejora de la escucha y feedback.",
      "career": []
    },
    {
      "course_image":"assets/courses/Consejos-para-resolver-conflictos.jpg",
      "name": "Manejo de Conflictos",
      "description": "Resolución de conflictos.",
      "career": []
    },
    {
      "course_image":"assets/courses/taller-de-presentaciones-efectivas.jpg",
      "name": "Presentaciones Efectivas y Oratoria",
      "description": "Habilidades de presentación.",
      "career": []
    },
    {
      "course_image":"assets/courses/y-mejora-el-manejo-del-estre204129s.webp",
      "name": "Resiliencia y Manejo del Estrés",
      "description": "Construcción de resiliencia.",
      "career": []
    }
  ],
  "Finanzas": [
    {
      "course_image":"assets/courses/images (2).jpeg",
      "name": "Finanzas Personales y Presupuestos Inteligentes",
      "description": "Gestión de finanzas personales y presupuestos.",
      "career": []
    },
    {
      "course_image":"assets/courses/you-need-financial-analytics.webp",
      "name": "Análisis Financiero con Excel",
      "description": "Análisis financiero utilizando Excel.",
      "career": []
    },
    {
      "course_image":"assets/courses/4-modelos-evaluar-proyectos-inversion-principal.jpg",
      "name": "Evaluación Financiera de Proyectos",
      "description": "Evaluación de proyectos financieros.",
      "career": []
    },
    {
      "course_image":"assets/courses/Finanzas-Corporativas.jpg",
      "name": "Finanzas Corporativas y Valoración de Empresas",
      "description": "Finanzas corporativas y valoración.",
      "career": []
    },
    {

      "course_image":"assets/courses/gestion-financiera-para-emprendedores.png",
      "name": "Gestión Financiera para Emprendedores",
      "description": "Gestión financiera para emprendedores.",
      "career": []
    },
    {
      "course_image":"assets/courses/CONTROL DEL PRESUPUESTO.jpg",
      "name": "Planeación y Control Presupuestario",
      "description": "Planeación y control de presupuestos.",
      "career": []
    },
    {
      "course_image":"assets/courses/finanzas-no-financieros.jpg",
      "name": "Finanzas para No Financieros",
      "description": "Finanzas básicas para no expertos.",
      "career": []
    },
    {
      "course_image":"assets/courses/contabilidadbasica.com-CONTABILIDAD-BASICA.jpg",
      "name": "Contabilidad Básica y Estados Financieros",
      "description": "Contabilidad básica y estados.",
      "career": []
    },
    {
      "course_image":"assets/courses/1677570770001.jpeg",
      "name": "Modelado Financiero con Excel",
      "description": "Modelado financiero en Excel.",
      "career": []
    },
    {
      "course_image":"assets/courses/Pasos-para-el-analisis-de-riesgo-financiero-blog-Pirani.webp",
      "name": "Riesgos Financieros y Gestión Estratégica",
      "description": "Gestión de riesgos financieros.",
      "career": []
    },
    {
      "course_image":"assets/courses/cuadro-mando-integral.jpg",
      "name": "KPIs Financieros y Cuadro de Mando Integral",
      "description": "KPIs y cuadros de mando financieros.",
      "career": []
    },
    {
      "course_image":"assets/courses/Diseno-sin-titulo-3a.jpg",
      "name": "Finanzas Internacionales",
      "description": "Aspectos de finanzas internacionales.",
      "career": []
    },
    {
      "course_image":"assets/courses/iStock-1331297790-scaled.jpg",
      "name": "Simulación Financiera para la Toma de Decisiones",
      "description": "Simulaciones para decisiones financieras.",
      "career": []
    },
    {
      "course_image":"assets/courses/tribu.webp",
      "name": "Tributación Empresarial en Costa Rica",
      "description": "Tributación en Costa Rica para empresas.",
      "career": []
    }
  ],
  "Recursos Humanos": [
    {
      "course_image":"assets/courses/hq720.jpg",
      "name": "Analítica de Recursos Humanos con Power BI*",
      "description": "Analítica de RRHH con Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/gestioncompetencias3.jpg",
      "name": "Gestión del Talento Humano por Competencias",
      "description": "Gestión de talento por competencias.",
      "career": []
    },
    {
      "course_image":"assets/courses/Proceso-de-Reclutamiento-y-Seleccion-de-Personal-Efectivo-2.jpg",
      "name": "Reclutamiento y Selección Efectiva",
      "description": "Procesos de reclutamiento y selección.",
      "career": []
    },
    {
      "course_image":"assets/courses/metodos-de-evaluacion-de-desempeno.webp",
      "name": "Desarrollo Organizacional y Evaluación de Desempeño",
      "description": "Desarrollo y evaluación organizacional.",
      "career": []
    },
    {
      "course_image":"assets/courses/66ac14cc6659bfcaf17e27ed_63c6d3b1b6c0d748045ec487_KPI.png",
      "name": "Indicadores Clave (KPI) en Recursos Humanos",
      "description": "KPIs en RRHH.",
      "career": []
    },
    {
      "course_image":"assets/courses/codigo-de-trabajo-de-costa-rica.jpg",
      "name": "Legislación Laboral Costarricense Actualizada",
      "description": "Legislación laboral en Costa Rica.",
      "career": []
    },
    {
      "course_image":"assets/courses/quipos-de-alto-desempeno.jpg",
      "name": "Liderazgo y Gestión de Equipos de Alto Desempeño",
      "description": "Liderazgo para equipos de alto desempeño.",
      "career": []
    },
    {
      "course_image":"assets/courses/660212ddb280f05b2e4d3c2a_6476ac8cfcda5206fe31b99c_lapzo-entrada2-mayo-img2.jpeg",
      "name": "Cultura Organizacional y Clima Laboral",
      "description": "Cultura y clima organizacional.",
      "career": []
    },
    {
      "course_image":"assets/courses/plan-carrera-profesional-.jpg",
      "name": "Capacitación y Planes de Carrera",
      "description": "Capacitación y desarrollo de carrera.",
      "career": []
    },
    {
      "course_image":"assets/courses/Untitled-1-min-5.jpg",
      "name": "Gestión del Cambio en Procesos Humanos",
      "description": "Gestión del cambio en RRHH.",
      "career": []
    },
    {
      "course_image":"assets/courses/iStock-1488061818.jpg",
      "name": "Onboarding y Fidelización de Talento",
      "description": "Onboarding y retención de talento.",
      "career": []
    },
    {
      "course_image":"assets/courses/equilibrio-mujer-meditando-trabajando-salud-mental-cuidados.jpg",
      "name": "Salud Mental y Bienestar Laboral",
      "description": "Salud mental en el trabajo.",
      "career": []
    },
    // Till now the images are done 
    {
      "course_image":"assets/courses/hr-automation-scaled.jpg",
      "name": "Automatización de Procesos de RRHH",
      "description": "Automatización en RRHH.",
      "career": []
    },
    {
      "course_image":"assets/courses/Tendencias-en-Recursos-Humanos-Reducida.jpg",
      "name": "Employee Experience: Tendencias y Prácticas",
      "description": "Experiencia del empleado.",
      "career": []
    },
    {
      "course_image":"assets/courses/1707809449386.png",
      "name": "Inteligencia Emocional para Líderes de RRHH",
      "description": "Inteligencia emocional para líderes.",
      "career": []
    },
    {
      "course_image":"assets/courses/How-to-design-implement-an-effective-Compensation-and-Reward-strategy.webp",
      "name": "Estrategias de compensación y Beneficios*",
      "description": "Estrategias de compensación.",
      "career": []
    }
  ],
  "Calidad": [
    {
      "course_image":"assets/courses/1200x600.png",
      "name": "Introducción a la Gestión de Calidad",
      "description": "Introducción a gestión de calidad.",
      "career": []
    },
    {
      "course_image":"assets/courses/Comparativa-de-Herramientas-para-Control-Estadistico-de-Procesos.webp",
      "name": "Control Estadístico de Procesos (CEP)",
      "description": "Control estadístico de procesos.",
      "career": []
    },
    {
      "course_image":"assets/courses/hq720 (1).jpg",
      "name": "Herramientas Básicas de la Calidad",
      "description": "Herramientas básicas de calidad.",
      "career": []
    },
    {
      "course_image":"assets/courses/Indicadores-Cuadro-de-Mando.jpg",
      "name": "Gestión por Indicadores y Cuadro de Mando",
      "description": "Gestión por indicadores.",
      "career": []
    },
    {
      "course_image":"assets/courses/UMS_Badges_YB_certified.png",
      "name": "Lean Six Sigma - Nivel Yellow Belt",
      "description": "Lean Six Sigma Yellow Belt.",
      "career": []
    },
    {
      "course_image":"assets/courses/maxresdefault (3).jpg",
      "name": "Documentación de Procesos y Mejora Continua",
      "description": "Documentación y mejora continua.",
      "career": []
    },
    {
      "course_image":"assets/courses/normas-iso-utilizadas.jpg",
      "name": "Normas ISO aplicables a Calidad y Procesos",
      "description": "Normas ISO para calidad.",
      "career": []
    },
    {
      "course_image":"assets/courses/Metodologias-eficientes-para-resolver-no-conformidades-y-acciones-correctivas_11zon.webp",
      "name": "Gestión de No Conformidades y Acciones Correctivas",
      "description": "Gestión de no conformidades.",
      "career": []
    },
    {
      "course_image":"assets/courses/Sistema-integrado.png",
      "name": "Sistemas Integrados de Gestión",
      "description": "Sistemas integrados de gestión.",
      "career": []
    },
    {
      "course_image":"assets/courses/Control estadistico de calidad.jpg",
      "name": "Inspección de Calidad y Muestreo Estadístico",
      "description": "Inspección y muestreo.",
      "career": []
    },
    {
      "course_image":"assets/courses/1619417457334.png",
      "name": "Costos de la Calidad: Prevención y Falla",
      "description": "Costos de calidad.",
      "career": []
    },
    {
      "course_image":"assets/courses/Satisfacción-retocada.jpg",
      "name": "Evaluación de Satisfacción del Cliente",
      "description": "Evaluación de satisfacción.",
      "career": []
    },
    {
      "course_image":"assets/courses/SIPOC_Template.png",
      "name": "Mapas de Procesos y Diagramas SIPOC",
      "description": "Mapas de procesos y SIPOC.",
      "career": []
    },
    {
      "course_image":"assets/courses/trazabilidad-de-la-documentacion-1-1024x683.jpg",
      "name": "Trazabilidad y Control Documental",
      "description": "Trazabilidad y control documental.",
      "career": []
    }
  ],
  "Contratación Pública (Costa Rica)": [
    {
      "course_image":"assets/courses/Introduccion-a-la-Contratacion-Administrativa.jpeg",
      "name": "Introducción a la Contratación Pública en Costa Rica",
      "description": "Introducción a contratación pública.",
      "career": []
    },
    {
      "course_image":"assets/courses/introduccion-al-uso-del-sistema-SICOP-e1858a6d.jpg",
      "name": "Uso del Sistema SICOP para Proveedores",
      "description": "Uso de SICOP para proveedores.",
      "career": []
    },
    {
      "course_image":"assets/courses/C.R.-6-1080x675-1.png",
      "name": "Marco Legal de la Ley N.º 9986 (Ley General de Contratación Pública)",
      "description": "Marco legal de la Ley 9986.",
      "career": []
    },
    {
      "course_image":"assets/courses/introduccion-al-uso-del-sistema-SICOP-e1858a6d (1).jpg",
      "name": "Elaboración de Ofertas Competitivas en SICOP",
      "description": "Elaboración de ofertas en SICOP.",
      "career": []
    },
    {
      "course_image":"assets/courses/Transformaciondigital-ic_Mesa-de-trabajo-1.png",
      "name": "Análisis de Carteles y Requisitos Técnicos",
      "description": "Análisis de carteles.",
      "career": []
    },
    {
      "course_image":"assets/courses/674dd5c1c5b8e5c5e067e874_retr.webp",
      "name": "Gestión Documental para Proveedores del Estado",
      "description": "Gestión documental para proveedores.",
      "career": []
    },
    {
      "course_image":"assets/courses/22-Figure1.1-1.png",
      "name": "Tipos de Procedimientos de Contratación",
      "description": "Tipos de procedimientos.",
      "career": []
    },
    {
      "course_image":"assets/courses/download.webp",
      "name": "Fases del Procedimiento: Desde el cartel hasta la adjudicación",
      "description": "Fases del procedimiento.",
      "career": []
    },
    {
      "course_image":"assets/courses/recurso-apelacion-hegel.jpg",
      "name": "Recursos y Apelaciones en Contratación Pública",
      "description": "Recursos y apelaciones.",
      "career": []
    },
    {
      "course_image":"assets/courses/La integridad como eje del nuevo modelo de Contratación Pública.webp",
      "name": "Ética y Transparencia en Contrataciones Públicas",
      "description": "Ética y transparencia.",
      "career": []
    },
    {
      "course_image":"assets/courses/Logo_SICOP.png",
      "name": "Registro y Clasificación en el SICOP",
      "description": "Registro en SICOP.",
      "career": []
    },
    {
      "course_image":"assets/courses/acuerdo-manos.jpg",
      "name": "Evaluación de Propuestas y Criterios de Adjudicación",
      "description": "Evaluación de propuestas.",
      "career": []
    },
    {
      "course_image":"assets/courses/gestion-licitaciones-contratos-publicos-scaled.webp",
      "name": "Gestión de Contratos Públicos y Seguimiento",
      "description": "Gestión de contratos.",
      "career": []
    },
    {
      "course_image":"assets/courses/IMG_8881-e1515599683878.jpg",
      "name": "Rol del Colegio Profesional en Licitaciones",
      "description": "Rol de colegios profesionales.",
      "career": []
    },
    {
      "course_image":"assets/courses/foto09.jpg",
      "name": "Contrataciones Directas y Excepcionales",
      "description": "Contrataciones directas.",
      "career": []
    }
  ],
  "Ciencia de Datos": [
    {
      "course_image":"assets/courses/a655384d7f37.png",
      "name": "Fundamentos de Ciencia de Datos",
      "description": "Fundamentos de ciencia de datos.",
      "career": []
    },
    {
      "course_image":"assets/courses/ONWzoUFQQOCEn6Ocbpsa_FUNDAMENTOS+DE+PYTHON.png",
      "name": "Introducción a Python para Ciencia de Datos",
      "description": "Python para ciencia de datos.",
      "career": []
    },
    {
      "course_image":"assets/courses/image.png",
      "name": "Visualización de Datos con Power BI y Tableau",
      "description": "Visualización con Power BI y Tableau.",
      "career": []
    },
    {
      "course_image":"assets/courses/businesswoman-networking-using-digital-devices.jpg",
      "name": "Estadística Aplicada a Datos",
      "description": "Estadística aplicada.",
      "career": []
    },
    {
      "course_image":"assets/courses/3944270_2fe3_20.webp",
      "name": "Limpieza y Preparación de Datos con Python y Power Query",
      "description": "Limpieza de datos.",
      "career": []
    },
    {
      "course_image":"assets/courses/shutterstock_680929729-1.jpg",
      "name": "Machine Learning: Teoría y Aplicaciones Básicas",
      "description": "Teoría y aplicaciones de ML.",
      "career": []
    },
    {
      "course_image":"assets/courses/AdobeStock_582601999-scaled.jpeg",
      "name": "Modelos Predictivos para Negocios",
      "description": "Modelos predictivos.",
      "career": []
    },
    {
      "course_image":"assets/courses/Analisis-de-datos.jpeg",
      "name": "Ciencia de Datos para Toma de Decisiones Empresariales",
      "description": "Ciencia de datos para decisiones.",
      "career": []
    },
    {
      "course_image":"assets/courses/desarrollando-codigos-de-conducta-etica-en-proyectos-de-datos-1-600x373.jpg",
      "name": "Ética en Ciencia de Datos",
      "description": "Ética en datos.",
      "career": []
    },
    {
      "course_image":"assets/courses/1411-1.jpg",
      "name": "Automatización de Análisis de Datos",
      "description": "Automatización de análisis.",
      "career": []
    },
    {
      "course_image":'assets/courses/análisis multivariante - 1.jpg',
      "name": "Introducción al Análisis Multivariado",
      "description": "Análisis multivariado.",
      "career": []
    },
    {
      "course_image":"assets/courses/big-data-1024x724-1-1024x675-min-1024x675-1024x675.jpeg",
      "name": "Big Data: Conceptos Clave y Aplicaciones",
      "description": "Conceptos de big data.",
      "career": []
    },
    {
      "course_image":"assets/courses/Sin-título-2.png",
      "name": "Minería de Datos en R y Python",
      "description": "Minería de datos.",
      "career": []
    },
    {
      "course_image":"assets/courses/grafico-correlacion-clustering-1024x531.webp",
      "name": "Modelos de Segmentación y Clustering",
      "description": "Segmentación y clustering.",
      "career": []
    },
    {
      "course_image":"assets/courses/Inteligencia-Artificial-y-Ciencia-de-Datos_-Descubriendo-el-Potencial_av.jpg",
      "name": "Inteligencia Artificial y Ciencia de Datos Aplicada",
      "description": "IA y datos aplicada.",
      "career": []
    }
  ],
  "Bases de Datos": [
    {
      "course_image":"assets/courses/helisulbaranBD01.jpg",
      "name": "Introducción a Bases de Datos Relacionales",
      "description": "Introducción a BD relacionales.",
      "career": []
    },
    {
      "course_image":"assets/courses/unnamed.jpg",
      "name": "SQL Básico: Consultas y Gestión de Datos",
      "description": "SQL básico.",
      "career": []
    },
    {
      "course_image":"assets/courses/normalizacion-bases-datos-1200x630.original.jpg",
      "name": "Diseño y Normalización de Bases de Datos",
      "description": "Diseño y normalización.",
      "career": []
    },
    {
      "course_image":"assets/courses/2426324_44c3_2.webp",
      "name": "SQL Avanzado: Subconsultas, Triggers y Funciones",
      "description": "SQL avanzado.",
      "career": []
    },
    {
      "course_image":"assets/courses/4110826_7f58_3.webp",
      "name": "Administración de Bases de Datos con MySQL",
      "description": "Administración con MySQL.",
      "career": []
    },
    {
      "course_image":'assets/courses/que-es-postgresql.png',
      "name": "PostgreSQL: Modelado y Optimización",
      "description": "PostgreSQL modelado.",
      "career": []
    },
    {
      "course_image":"assets/courses/SQL-Server.avif",
      "name": "Microsoft SQL Server para Analistas",
      "description": "SQL Server para analistas.",
      "career": []
    },
    {
      "course_image":"assets/courses/hq720 (2).jpg",
      "name": "Seguridad en Bases de Datos y Control de Acceso",
      "description": "Seguridad en BD.",
      "career": []
    },
    {
      "course_image":"assets/courses/illu_mangoDB_blog-79.png",
      "name": "MongoDB y Bases de Datos NoSQL",
      "description": "MongoDB y NoSQL.",
      "career": []
    },
    {
      "course_image":"assets/courses/maxresdefault (4).jpg",
      "name": "Integración de Bases de Datos con Power BI",
      "description": "Integración con Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/automatizar-sql-server-con-conecta-hub.png",
      "name": "Automatización de Reportes desde SQL",
      "description": "Automatización de reportes.",
      "career": []
    },
    {
      "course_image":"assets/courses/Data-Science-info-1024x647.png",
      "name": "Modelado de Datos para Ciencia de Datos",
      "description": "Modelado para ciencia de datos.",
      "career": []
    }
  ],
  "Semiconductores": [
    {
      "course_image":"assets/courses/temp_image-966.jpg",
      "name": "Fundamentos de Semiconductores",
      "description": "Fundamentos de semiconductores.",
      "career": []
    },
    {
      "course_image":"assets/courses/114-3.png",
      "name": "Dispositivos Semiconductores: Diodos, Transistores y CI",
      "description": "Dispositivos como diodos y transistores.",
      "career": []
    },
    {
      "course_image":"assets/courses/25B_SEMICONDUCTORES_PORTADA-scaled.jpg",
      "name": "Aplicaciones de Semiconductores en Smartphones",
      "description": "Aplicaciones en smartphones.",
      "career": []
    },
    {
      "course_image":"assets/courses/20240709145110501.jpg",
      "name": "Tecnología CMOS y Nanoelectrónica",
      "description": "Tecnología CMOS y nanoelectrónica.",
      "career": []
    },
    {
      "course_image":"assets/courses/Wafer-Check_fix1024x469.webp",
      "name": "Control de Calidad en la Fabricación de Semiconductores",
      "description": "Control de calidad en fabricación.",
      "career": []
    },
    {
      "course_image":"assets/courses/1846102491915681792.png",
      "name": "Inteligencia Artificial en el Diagnóstico de Chips",
      "description": "IA en diagnóstico de chips.",
      "career": []
    },
    {
      "course_image":"assets/courses/semi-condcutor-.webp",
      "name": "Cadena de Suministro de Semiconductores",
      "description": "Cadena de suministro.",
      "career": []
    },
    {
      "course_image":"assets/courses/0623-planet-earth-and-microchip-header-820x410.webp",
      "name": "Tendencias Globales en la Industria de Chips",
      "description": "Tendencias globales en chips.",
      "career": []
    }
  ]
};

// Course data in English (translated)
const courseDataEn = {
  "Digital Skills Path": {
    "Python": [
      {
        "course_image": "assets/courses/Python-Programming.jpg",
        "name": "Development of Machine Learning Models with Python",
        "description": "Trains students in creating, training, and evaluating machine learning models with Python, covering classification, regression, and clustering, model optimization, and feature selection using libraries like scikit-learn, cross-validation, and hyperparameter tuning.",
        "career": ["Data Engineering", "Data Scientist", "Data Analyst", "Machine Learning Developer"]
      },
      {
        "course_image": "assets/courses/how-is-python-used-in-finance.png",
        "name": "Analyze Financial Data with Python",
        "description": "Provides skills for statistical analysis, financial modeling, and visualization of financial data with Python, using libraries like Pandas and NumPy for manipulation and analysis.",
        "career": ["Financial Analyst", "Risk Analyst", "Financial Consultant", "Financial Data Scientist"]
      },
      {
        "course_image": "assets/courses/chatbot-4071274_1920.jpg",
        "name": "Chatbot Development with Python",
        "description": "Focused on natural language processing (NLP) and development of conversational interfaces with libraries like NLTK, spaCy, ChatterBot, and Rasa.",
        "career": ["Chatbot Developer", "Conversational Automation Engineer", "Conversational User Interface Specialist"]
      },
      {
        "course_image": "assets/courses/1_XzIRJGujfqAiOV2EIQgR_Q.png",
        "name": "Build Web Applications with Python and Flask",
        "description": "Web application development with Flask, including web architecture, routes, forms, databases with SQLAlchemy, authentication, and RESTful APIs.",
        "career": ["Web Developer", "Software Engineer", "Python Application Developer", "Backend Developer"]
      },
      {
        "course_image": "assets/courses/1_E6jhcyx5k-18j5Aadq4FTg.png",
        "name": "Build Deep Learning Models with TensorFlow",
        "description": "Building deep learning models with TensorFlow, including neural networks, optimization, transfer learning, and applications in computer vision and NLP.",
        "career": ["Machine Learning Engineer", "Data Scientist", "Artificial Intelligence Developer", "Deep Learning Researcher"]
      },
      {
        "course_image": "assets/courses/natural-language-processing-nlp.png",
        "name": "Apply Natural Language Processing with Python",
        "description": "Application of NLP techniques such as sentiment analysis, entity extraction, and machine translation with libraries like NLTK, spaCy, and transformers.",
        "career": ["NLP Engineer", "Natural Language Processing Application Developer", "NLP Data Scientist"]
      },
      {
        "course_image": "assets/courses/python-django-1024x576.webp",
        "name": "Build Web Applications with Python and Django",
        "description": "Web application development with Django, including project structure, models, databases, authentication, and permission management.",
        "career": ["Full Stack Developer", "Web Software Engineer", "Django Developer", "Web Application Architect"]
      },
      {
        "course_image": "assets/courses/What-is-data-science-2.jpg",
        "name": "Software Engineering for Data Scientists",
        "description": "Application of software engineering principles in data science, including project structuring, best practices, collaboration, and data pipelines.",
        "career": ["Software Engineer for Data Science", "Scientific Software Developer", "Data Engineer", "Data Scientist"]
      },
      {
        "course_image": "assets/courses/maxresdefault.jpg",
        "name": "Machine Learning",
        "description": "Overview of machine learning, supervised and unsupervised algorithms, model evaluation, and real-world applications.",
        "career": ["Data Scientist", "Machine Learning Engineer", "Data Analyst", "Machine Learning Algorithm Developer"]
      },
      {
        "course_image": "assets/courses/1_ocaE5pTwxGuXKUhfalFuIw.jpg",
        "name": "Fundamentals of Machine Learning and Artificial Intelligence",
        "description": "Introduction to ML and AI fundamentals, including classification, regression, clustering, supervised/unsupervised learning, ethics, and interpretability.",
        "career": ["Students", "Beginners in Data Science", "Developers seeking to understand basic principles of AI and ML"]
      },
      {
        "course_image": "assets/courses/115972543-04513e80-a51d-11eb-8466-5f460b3cb1e0.png",
        "name": "Analyze and Visualize Data with Python",
        "description": "Data analysis and visualization with Python, using Pandas, Matplotlib, Seaborn, and creating interactive dashboards.",
        "career": ["Data Analyst", "Data Scientist", "Data Visualization Consultant", "Business Intelligence Developer"]
      }
    ],
    "JavaScript": [
      {
        "course_image": "assets/courses/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_sk3vdofe7r7r5wax1scb.webp",
        "name": "Create an Advanced Web Application with React and Redux",
        "description": "Development of advanced web applications with React and Redux, reusable components, state management, and performance optimization.",
        "career": ["Frontend Developer", "Web Software Engineer", "React Application Developer", "User Interface Specialist"]
      },
      {
        "course_image": "assets/courses/course_1674371266.jpg",
        "name": "Create a Front-End Application with React",
        "description": "React fundamentals for building interactive interfaces, component and state management.",
        "career": ["Frontend Developer", "User Interface Designer", "User Interface Developer", "User Experience (UX) Specialist"]
      },
      {
        "course_image": "assets/courses/Best-Backend-for-React-JS.webp",
        "name": "Create a Back-End Application with JavaScript",
        "description": "Building back-end applications with JavaScript, server handling, routes, and databases for full stack development.",
        "career": ["Backend Developer", "Software Engineer", "Software Architect", "Full Stack Developer"]
      },
      {
        "course_image": "assets/courses/1623061726595_1.avif",
        "name": "Create a Video Game with Phaser.js",
        "description": "Development of 2D video games with Phaser.js, graphics, game logic, and optimization for interactive experiences.",
        "career": ["Video Game Developer", "Game Designer", "Entertainment Software Engineer", "Game User Experience Developer"]
      }
    ],
    "HTML & CSS": [
      {
        "course_image": "assets/courses/67ff6ed197440c001def433d.jpg",
        "name": "Build a Website with HTML, CSS, and GitHub Pages",
        "description": "Introduction to HTML and CSS for static websites, with hosting on GitHub Pages for collaboration and deployment.",
        "career": ["Web Developer", "Web Designer", "Frontend Development Specialist", "Website Engineer"]
      }
    ],
    "SQL": [
      {
        "course_image": "assets/courses/What_is_SQL_Database.png",
        "name": "Analyze Data with SQL",
        "description": "Use of SQL for complex queries, joins, aggregations, and analysis in relational databases.",
        "career": ["Data Analyst", "Data Engineer", "Data Scientist", "Database Consultant"]
      },
      {
        "course_image": "assets/courses/PostgreSQL.jpg",
        "name": "Design Databases with PostgreSQL",
        "description": "Database design with PostgreSQL, data modeling, relationships, and performance optimization.",
        "career": ["Database Designer", "Data Engineer", "Database Administrator", "Backend Developer"]
      }
    ],
    "Java": [
      {
        "course_image": "assets/courses/Learn-Java-For-Android-App-Development-FREE.png",
        "name": "Build Android Applications with Java",
        "description": "Android application development with Java, user interfaces, event handling, and Android-specific functions.",
        "career": ["Android Application Developer", "Mobile Software Engineer", "Java Developer", "Mobile Application Development Specialist"]
      },
      {
        "course_image": "assets/courses/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_wz4lrwt4l98m3q9l97fg.webp",
        "name": "Create REST APIs with Spring and Java",
        "description": "Creation of RESTful APIs with Spring and Java for scalable and efficient web services.",
        "career": ["API Developer", "Software Engineer", "Software Architect", "Java Developer"]
      }
    ],
    "C": [
      {
        "course_image": "assets/courses/1679804058550.jpeg",
        "name": "Learn the C Programming Language",
        "description": "Introduction to the C language, control structures, functions, and memory manipulation for fundamental programming concepts.",
        "career": ["C Programmer", "Systems Software Developer", "Embedded Software Engineer", "Operating Systems Programmer"]
      }
    ],
    "R": [
      {
        "course_image": "assets/courses/Rprogramming.jpg",
        "name": "Analyze Data with R",
        "description": "Data analysis and visualization with R, including statistical analysis, graphs, and specialized packages.",
        "career": ["Data Analyst", "Data Scientist", "Statistics Researcher", "Data Consultant"]
      }
    ],
    "PHP": [
      {
        "course_image": "assets/courses/php_course.png",
        "name": "Learn PHP",
        "description": "Introduction to PHP for server-side web development, dynamic sites, database interaction, and web applications.",
        "career": ["Backend Developer", "Web Software Engineer", "PHP Developer", "Web Application Development Specialist"]
      }
    ],
    "Swift": [
      {
        "course_image": "assets/courses/swift_programming.png",
        "name": "Develop iOS Applications with SwiftUI",
        "description": "iOS application development with SwiftUI, declarative approach for user interfaces on Apple devices.",
        "career": ["iOS Application Developer", "Mobile Software Engineer", "Swift Developer", "Apple Device Application Development Specialist"]
      }
    ],
    "Excel & Power BI": [
      {
        "course_image": "assets/courses/K2un32dRwCDR7KcVnooD_Excel+for+Biz+Analysts.jpg",
        "name": "Advanced Excel for Business Data Analysis",
        "description": "Advanced use of Excel for business data analysis, complex formulas, pivot tables, and tools for informed decisions.",
        "career": ["Business Data Analyst", "Excel Specialist", "Business Data Consultant", "Financial Analyst"]
      },
      {
        "course_image": "assets/courses/excel-automatation.png",
        "name": "Automation and Efficiency with Macros in Excel",
        "description": "Automation of repetitive tasks with macros in Excel to increase efficiency and reduce errors.",
        "career": ["Excel Automation Specialist", "Process Analyst", "Data Engineer", "Business Task Efficiency Consultant"]
      },
      {
        "course_image": "assets/courses/0-7PYW_0c0WGfrJ1NK.png",
        "name": "Power Query and Power Pivot in Excel: Data Transformation",
        "description": "Data transformation and analysis with Power Query and Power Pivot, advanced models, and information extraction from extensive sets.",
        "career": ["Data Analyst", "Data Transformation Specialist", "Data Engineer", "Predictive Analysis Consultant"]
      },
      {
        "course_image": "assets/courses/predictive-analytics-excel-spreadsheet-template.png",
        "name": "Predictive Analysis with Excel",
        "description": "Application of predictive techniques in Excel, statistical functions, models, and forecasts based on historical data.",
        "career": ["Data Analyst", "Data Scientist", "Business Analyst", "Predictive Analysis Consultant"]
      },
      {
        "course_image": "assets/courses/power-BI.jpeg",
        "name": "Effective Data Visualization with Power BI",
        "description": "Creation of effective visual reports with Power BI, data connection, interactive dashboards, and communication through graphs.",
        "career": ["Data Analyst", "Data Visualization Specialist", "Business Intelligence Consultant", "Data Scientist"]
      }
    ]
  },
  "Technological Courses": [
    {
      "course_image":"assets/courses/maxresdefault (1).jpg",
      "name": "Power BI Level 1 – Fundamentals*",
      "description": "Fundamentals of Power BI for beginners.",
      "career": []
    },
    {
      "course_image":"assets/courses/maxresdefault (2).jpg",
      "name": "Power BI Level 2 - Advanced Analysis*",
      "description": "Advanced analysis with Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/1_CCC980MBGyZJvMLfj0AaPw.png",
      "name": "Data Cleaning and Analysis with Power BI",
      "description": "Data cleaning and analysis techniques using Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/1720283550631.png",
      "name": "Power BI for Finance",
      "description": "Application of Power BI in the financial field.",
      "career": []
    },
    {
      "course_image":"assets/courses/Power-bi-kpi-1.jpg.webp",
      "name": "Power BI for Management Indicators (KPIs)",
      "description": "Use of Power BI to monitor KPIs.",
      "career": []
    },
    { 
      "course_image":"assets/courses/microsoft-excel-office365-tecnozero.webp",
      "name": "Basic Excel*",
      "description": "Basic Excel concepts.",
      "career": []
    },
    {

      "course_image":"assets/courses/Microsoft-Excel-Intermediate.avif",
      "name": "Intermediate Excel*",
      "description": "Intermediate level of Excel.",
      "career": []
    },
    {
      "course_image":"assets/courses/advExcel.png",
      "name": "Advanced Excel*",
      "description": "Advanced techniques in Excel.",
      "career": []
    },
    {
      "course_image":'assets/courses/1_57YDg0EsnSBYsTnwYPkSDg.jpg',
      "name": "Introduction to Artificial Intelligence",
      "description": "Introduction to AI concepts.",
      "career": []
    },
    {
      "course_image":"assets/courses/1663520031829.jpg",
      "name": "Artificial Intelligence Applied to Business",
      "description": "AI applications in business environments.",
      "career": []
    },
    {
      "course_image":"assets/courses/machine-learning-python.jpg",
      "name": "Machine Learning with Python",
      "description": "Machine learning using Python.",
      "career": []
    },
    {
      "course_image":"assets/courses/Data-Science-2.jpg",
      "name": "Introduction to Data Science",
      "description": "Fundamentals of data science.",
      "career": []
    },
    {
      "course_image":"assets/courses/base-de-datos-sql.jpg",
      "name": "Fundamentals of Databases and SQL",
      "description": "Databases and basic SQL queries.",
      "career": []
    },
    {
      "course_image":"assets/courses/semiconductores-1.webp",
      "name": "Semiconductors and their Application in Modern Technologies",
      "description": "Study of semiconductors and their modern uses.",
      "career": []
    },
    {
      "course_image":"assets/courses/Sicop-administracion-publica.webp",
      "name": "Public Procurement in Costa Rica: Legal Framework and Use of SICOP",
      "description": "Legal framework and use of the SICOP system in Costa Rica.",
      "career": []
    }
  ],
  "Soft Skills Courses": [
    {
      "course_image":"assets/courses/comunicacion.jpg",
      "name": "Effective Communication",
      "description": "Improvement of communication skills.",
      "career": []
    },
    {
      "course_image":"assets/courses/images (1).jpeg",
      "name": "Emotional Intelligence at Work",
      "description": "Management of emotions in the work environment.",
      "career": []
    },
    {
      "course_image":"assets/courses/large_colaboracion.jpg",
      "name": "Teamwork and Collaboration",
      "description": "Techniques for working in teams.",
      "career": []
    },
    {
      "course_image":"assets/courses/image-63.png",
      "name": "Leadership and Team Management",
      "description": "Leadership and management skills.",
      "career": []
    },
    {
      "course_image":"assets/courses/postRRSS-noticia-Febrero-Pensamiento-critico-horizontal.jpg",
      "name": "Critical Thinking and Problem Solving",
      "description": "Development of critical thinking.",
      "career": []
    },
    {
      "course_image":"assets/courses/LinkedIn-13.png",
      "name": "Time Management and Productivity",
      "description": "Strategies for managing time.",
      "career": []
    },
    {
      "course_image":"assets/courses/adaptabilidad-al-cambio.png",
      "name": "Adaptability to Change",
      "description": "Adaptation to changes in the environment.",
      "career": []
    },
    {
      "course_image":"assets/courses/creatividad-innovacion.jpg",
      "name": "Creativity and Innovation",
      "description": "Fostering creativity.",
      "career": []
    },
    {
      "course_image":"assets/courses/skills-negociacion.jpg",
      "name": "Negotiation Skills",
      "description": "Effective negotiation techniques.",
      "career": []
    },
    {
      "course_image":"assets/courses/La-empatia-en-las-relaciones-.jpg",
      "name": "Empathy and Interpersonal Relationships",
      "description": "Development of empathy and relationships.",
      "career": []
    },
    {
      "course_image":"assets/courses/shutterstock-61962856.jpg",
      "name": "Professional Ethics and Responsibility",
      "description": "Ethical principles in work.",
      "career": []
    },
    {
      "course_image":"assets/courses/Esucha-activa-y-feedback-constructivo-e1735042042743.jpg",
      "name": "Active Listening and Constructive Feedback",
      "description": "Improvement of listening and feedback.",
      "career": []
    },
    {
      "course_image":"assets/courses/Consejos-para-resolver-conflictos.jpg",
      "name": "Conflict Management",
      "description": "Conflict resolution.",
      "career": []
    },
    {
      "course_image":"assets/courses/taller-de-presentaciones-efectivas.jpg",
      "name": "Effective Presentations and Public Speaking",
      "description": "Presentation skills.",
      "career": []
    },
    {
      "course_image":"assets/courses/y-mejora-el-manejo-del-estre204129s.webp",
      "name": "Resilience and Stress Management",
      "description": "Building resilience.",
      "career": []
    }
  ],
  "Finance": [
    {
      "course_image":"assets/courses/images (2).jpeg",
      "name": "Personal Finance and Smart Budgeting",
      "description": "Management of personal finances and budgets.",
      "career": []
    },
    {
      "course_image":"assets/courses/you-need-financial-analytics.webp",
      "name": "Financial Analysis with Excel",
      "description": "Financial analysis using Excel.",
      "career": []
    },
    {
      "course_image":"assets/courses/4-modelos-evaluar-proyectos-inversion-principal.jpg",
      "name": "Financial Project Evaluation",
      "description": "Evaluation of financial projects.",
      "career": []
    },
    {
      "course_image":"assets/courses/Finanzas-Corporativas.jpg",
      "name": "Corporate Finance and Business Valuation",
      "description": "Corporate finance and valuation.",
      "career": []
    },
    {

      "course_image":"assets/courses/gestion-financiera-para-emprendedores.png",
      "name": "Financial Management for Entrepreneurs",
      "description": "Financial management for entrepreneurs.",
      "career": []
    },
    {
      "course_image":"assets/courses/CONTROL DEL PRESUPUESTO.jpg",
      "name": "Budget Planning and Control",
      "description": "Budget planning and control.",
      "career": []
    },
    {
      "course_image":"assets/courses/finanzas-no-financieros.jpg",
      "name": "Finance for Non-Financial Professionals",
      "description": "Basic finance for non-experts.",
      "career": []
    },
    {
      "course_image":"assets/courses/contabilidadbasica.com-CONTABILIDAD-BASICA.jpg",
      "name": "Basic Accounting and Financial Statements",
      "description": "Basic accounting and statements.",
      "career": []
    },
    {
      "course_image":"assets/courses/1677570770001.jpeg",
      "name": "Financial Modeling with Excel",
      "description": "Financial modeling in Excel.",
      "career": []
    },
    {
      "course_image":"assets/courses/Pasos-para-el-analisis-de-riesgo-financiero-blog-Pirani.webp",
      "name": "Financial Risks and Strategic Management",
      "description": "Management of financial risks.",
      "career": []
    },
    {
      "course_image":"assets/courses/cuadro-mando-integral.jpg",
      "name": "Financial KPIs and Balanced Scorecard",
      "description": "Financial KPIs and balanced scorecards.",
      "career": []
    },
    {
      "course_image":"assets/courses/Diseno-sin-titulo-3a.jpg",
      "name": "International Finance",
      "description": "Aspects of international finance.",
      "career": []
    },
    {
      "course_image":"assets/courses/iStock-1331297790-scaled.jpg",
      "name": "Financial Simulation for Decision Making",
      "description": "Simulations for financial decisions.",
      "career": []
    },
    {
      "course_image":"assets/courses/tribu.webp",
      "name": "Business Taxation in Costa Rica",
      "description": "Taxation in Costa Rica for businesses.",
      "career": []
    }
  ],
  "Human Resources": [
    {
      "course_image":"assets/courses/hq720.jpg",
      "name": "Human Resources Analytics with Power BI*",
      "description": "HR analytics with Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/gestioncompetencias3.jpg",
      "name": "Human Talent Management by Competencies",
      "description": "Talent management by competencies.",
      "career": []
    },
    {
      "course_image":"assets/courses/Proceso-de-Reclutamiento-y-Seleccion-de-Personal-Efectivo-2.jpg",
      "name": "Effective Recruitment and Selection",
      "description": "Recruitment and selection processes.",
      "career": []
    },
    {
      "course_image":"assets/courses/metodos-de-evaluacion-de-desempeno.webp",
      "name": "Organizational Development and Performance Evaluation",
      "description": "Organizational development and evaluation.",
      "career": []
    },
    {
      "course_image":"assets/courses/66ac14cc6659bfcaf17e27ed_63c6d3b1b6c0d748045ec487_KPI.png",
      "name": "Key Indicators (KPI) in Human Resources",
      "description": "KPIs in HR.",
      "career": []
    },
    {
      "course_image":"assets/courses/codigo-de-trabajo-de-costa-rica.jpg",
      "name": "Updated Costa Rican Labor Legislation",
      "description": "Labor legislation in Costa Rica.",
      "career": []
    },
    {
      "course_image":"assets/courses/quipos-de-alto-desempeno.jpg",
      "name": "Leadership and Management of High-Performance Teams",
      "description": "Leadership for high-performance teams.",
      "career": []
    },
    {
      "course_image":"assets/courses/660212ddb280f05b2e4d3c2a_6476ac8cfcda5206fe31b99c_lapzo-entrada2-mayo-img2.jpeg",
      "name": "Organizational Culture and Work Climate",
      "description": "Organizational culture and climate.",
      "career": []
    },
    {
      "course_image":"assets/courses/plan-carrera-profesional-.jpg",
      "name": "Training and Career Plans",
      "description": "Training and career development.",
      "career": []
    },
    {
      "course_image":"assets/courses/Untitled-1-min-5.jpg",
      "name": "Change Management in Human Processes",
      "description": "Change management in HR.",
      "career": []
    },
    {
      "course_image":"assets/courses/iStock-1488061818.jpg",
      "name": "Onboarding and Talent Retention",
      "description": "Onboarding and talent retention.",
      "career": []
    },
    {
      "course_image":"assets/courses/equilibrio-mujer-meditando-trabajando-salud-mental-cuidados.jpg",
      "name": "Mental Health and Workplace Well-Being",
      "description": "Mental health in the workplace.",
      "career": []
    },
    {
      "course_image":"assets/courses/hr-automation-scaled.jpg",
      "name": "Automation of HR Processes",
      "description": "Automation in HR.",
      "career": []
    },
    {
      "course_image":"assets/courses/Tendencias-en-Recursos-Humanos-Reducida.jpg",
      "name": "Employee Experience: Trends and Practices",
      "description": "Employee experience.",
      "career": []
    },
    {
      "course_image":"assets/courses/1707809449386.png",
      "name": "Emotional Intelligence for HR Leaders",
      "description": "Emotional intelligence for leaders.",
      "career": []
    },
    {
      "course_image":"assets/courses/How-to-design-implement-an-effective-Compensation-and-Reward-strategy.webp",
      "name": "Compensation and Benefits Strategies*",
      "description": "Compensation strategies.",
      "career": []
    }
  ],
  "Quality": [
    {
      "course_image":"assets/courses/1200x600.png",
      "name": "Introduction to Quality Management",
      "description": "Introduction to quality management.",
      "career": []
    },
    {
      "course_image":"assets/courses/Comparativa-de-Herramientas-para-Control-Estadistico-de-Procesos.webp",
      "name": "Statistical Process Control (SPC)",
      "description": "Statistical process control.",
      "career": []
    },
    {
      "course_image":"assets/courses/hq720 (1).jpg",
      "name": "Basic Quality Tools",
      "description": "Basic quality tools.",
      "career": []
    },
    {
      "course_image":"assets/courses/Indicadores-Cuadro-de-Mando.jpg",
      "name": "Management by Indicators and Dashboard",
      "description": "Management by indicators.",
      "career": []
    },
    {
      "course_image":"assets/courses/UMS_Badges_YB_certified.png",
      "name": "Lean Six Sigma - Yellow Belt Level",
      "description": "Lean Six Sigma Yellow Belt.",
      "career": []
    },
    {
      "course_image":"assets/courses/maxresdefault (3).jpg",
      "name": "Process Documentation and Continuous Improvement",
      "description": "Documentation and continuous improvement.",
      "career": []
    },
    {
      "course_image":"assets/courses/normas-iso-utilizadas.jpg",
      "name": "ISO Standards Applicable to Quality and Processes",
      "description": "ISO standards for quality.",
      "career": []
    },
    {
      "course_image":"assets/courses/Metodologias-eficientes-para-resolver-no-conformidades-y-acciones-correctivas_11zon.webp",
      "name": "Management of Non-Conformities and Corrective Actions",
      "description": "Management of non-conformities.",
      "career": []
    },
    {
      "course_image":"assets/courses/Sistema-integrado.png",
      "name": "Integrated Management Systems",
      "description": "Integrated management systems.",
      "career": []
    },
    {
      "course_image":"assets/courses/Control estadistico de calidad.jpg",
      "name": "Quality Inspection and Statistical Sampling",
      "description": "Inspection and sampling.",
      "career": []
    },
    {
      "course_image":"assets/courses/1619417457334.png",
      "name": "Quality Costs: Prevention and Failure",
      "description": "Quality costs.",
      "career": []
    },
    {
      "course_image":"assets/courses/Satisfacción-retocada.jpg",
      "name": "Customer Satisfaction Evaluation",
      "description": "Satisfaction evaluation.",
      "career": []
    },
    {
      "course_image":"assets/courses/SIPOC_Template.png",
      "name": "Process Maps and SIPOC Diagrams",
      "description": "Process maps and SIPOC.",
      "career": []
    },
    {
      "course_image":"assets/courses/trazabilidad-de-la-documentacion-1-1024x683.jpg",
      "name": "Traceability and Document Control",
      "description": "Traceability and document control.",
      "career": []
    }
  ],
  "Public Procurement (Costa Rica)": [
    {
      "course_image":"assets/courses/Introduccion-a-la-Contratacion-Administrativa.jpeg",
      "name": "Introduction to Public Procurement in Costa Rica",
      "description": "Introduction to public procurement.",
      "career": []
    },
    {
      "course_image":"assets/courses/introduccion-al-uso-del-sistema-SICOP-e1858a6d.jpg",
      "name": "Use of the SICOP System for Suppliers",
      "description": "Use of SICOP for suppliers.",
      "career": []
    },
    {
      "course_image":"assets/courses/C.R.-6-1080x675-1.png",
      "name": "Legal Framework of Law No. 9986 (General Public Procurement Law)",
      "description": "Legal framework of Law 9986.",
      "career": []
    },
    {
      "course_image":"assets/courses/introduccion-al-uso-del-sistema-SICOP-e1858a6d (1).jpg",
      "name": "Preparation of Competitive Offers in SICOP",
      "description": "Preparation of offers in SICOP.",
      "career": []
    },
    {
      "course_image":"assets/courses/Transformaciondigital-ic_Mesa-de-trabajo-1.png",
      "name": "Analysis of Bids and Technical Requirements",
      "description": "Analysis of bids.",
      "career": []
    },
    {
      "course_image":"assets/courses/674dd5c1c5b8e5c5e067e874_retr.webp",
      "name": "Document Management for State Suppliers",
      "description": "Document management for suppliers.",
      "career": []
    },
    {
      "course_image":"assets/courses/22-Figure1.1-1.png",
      "name": "Types of Procurement Procedures",
      "description": "Types of procedures.",
      "career": []
    },
    {
      "course_image":"assets/courses/download.webp",
      "name": "Procedure Phases: From Bid to Award",
      "description": "Procedure phases.",
      "career": []
    },
    {
      "course_image":"assets/courses/recurso-apelacion-hegel.jpg",
      "name": "Resources and Appeals in Public Procurement",
      "description": "Resources and appeals.",
      "career": []
    },
    {
      "course_image":"assets/courses/La integridad como eje del nuevo modelo de Contratación Pública.webp",
      "name": "Ethics and Transparency in Public Procurement",
      "description": "Ethics and transparency.",
      "career": []
    },
    {
      "course_image":"assets/courses/Logo_SICOP.png",
      "name": "Registration and Classification in SICOP",
      "description": "Registration in SICOP.",
      "career": []
    },
    {
      "course_image":"assets/courses/acuerdo-manos.jpg",
      "name": "Proposal Evaluation and Award Criteria",
      "description": "Proposal evaluation.",
      "career": []
    },
    {
      "course_image":"assets/courses/gestion-licitaciones-contratos-publicos-scaled.webp",
      "name": "Public Contract Management and Monitoring",
      "description": "Contract management.",
      "career": []
    },
    {
      "course_image":"assets/courses/IMG_8881-e1515599683878.jpg",
      "name": "Role of Professional Colleges in Bids",
      "description": "Role of professional colleges.",
      "career": []
    },
    {
      "course_image":"assets/courses/foto09.jpg",
      "name": "Direct and Exceptional Procurement",
      "description": "Direct procurement.",
      "career": []
    }
  ],
  "Data Science": [
    {
      "course_image":"assets/courses/a655384d7f37.png",
      "name": "Fundamentals of Data Science",
      "description": "Fundamentals of data science.",
      "career": []
    },
    {
      "course_image":"assets/courses/ONWzoUFQQOCEn6Ocbpsa_FUNDAMENTOS+DE+PYTHON.png",
      "name": "Introduction to Python for Data Science",
      "description": "Python for data science.",
      "career": []
    },
    {
      "course_image":"assets/courses/image.png",
      "name": "Data Visualization with Power BI and Tableau",
      "description": "Visualization with Power BI and Tableau.",
      "career": []
    },
    {
      "course_image":"assets/courses/businesswoman-networking-using-digital-devices.jpg",
      "name": "Applied Statistics to Data",
      "description": "Applied statistics.",
      "career": []
    },
    {
      "course_image":"assets/courses/3944270_2fe3_20.webp",
      "name": "Data Cleaning and Preparation with Python and Power Query",
      "description": "Data cleaning.",
      "career": []
    },
    {
      "course_image":"assets/courses/shutterstock_680929729-1.jpg",
      "name": "Machine Learning: Theory and Basic Applications",
      "description": "Theory and applications of ML.",
      "career": []
    },
    {
      "course_image":"assets/courses/AdobeStock_582601999-scaled.jpeg",
      "name": "Predictive Models for Business",
      "description": "Predictive models.",
      "career": []
    },
    {
      "course_image":"assets/courses/Analisis-de-datos.jpeg",
      "name": "Data Science for Business Decision Making",
      "description": "Data science for decisions.",
      "career": []
    },
    {
      "course_image":"assets/courses/desarrollando-codigos-de-conducta-etica-en-proyectos-de-datos-1-600x373.jpg",
      "name": "Ethics in Data Science",
      "description": "Ethics in data.",
      "career": []
    },
    {
      "course_image":"assets/courses/1411-1.jpg",
      "name": "Automation of Data Analysis",
      "description": "Automation of analysis.",
      "career": []
    },
    {
      "course_image":'assets/courses/análisis multivariante - 1.jpg',
      "name": "Introduction to Multivariate Analysis",
      "description": "Multivariate analysis.",
      "career": []
    },
    {
      "course_image":"assets/courses/big-data-1024x724-1-1024x675-min-1024x675-1024x675.jpeg",
      "name": "Big Data: Key Concepts and Applications",
      "description": "Big data concepts.",
      "career": []
    },
    {
      "course_image":"assets/courses/Sin-título-2.png",
      "name": "Data Mining in R and Python",
      "description": "Data mining.",
      "career": []
    },
    {
      "course_image":"assets/courses/grafico-correlacion-clustering-1024x531.webp",
      "name": "Segmentation and Clustering Models",
      "description": "Segmentation and clustering.",
      "career": []
    },
    {
      "course_image":"assets/courses/Inteligencia-Artificial-y-Ciencia-de-Datos_-Descubriendo-el-Potencial_av.jpg",
      "name": "Artificial Intelligence and Applied Data Science",
      "description": "AI and applied data.",
      "career": []
    }
  ],
  "Databases": [
    {
      "course_image":"assets/courses/helisulbaranBD01.jpg",
      "name": "Introduction to Relational Databases",
      "description": "Introduction to relational DBs.",
      "career": []
    },
    {
      "course_image":"assets/courses/unnamed.jpg",
      "name": "Basic SQL: Queries and Data Management",
      "description": "Basic SQL.",
      "career": []
    },
    {
      "course_image":"assets/courses/normalizacion-bases-datos-1200x630.original.jpg",
      "name": "Database Design and Normalization",
      "description": "Design and normalization.",
      "career": []
    },
    {
      "course_image":"assets/courses/2426324_44c3_2.webp",
      "name": "Advanced SQL: Subqueries, Triggers, and Functions",
      "description": "Advanced SQL.",
      "career": []
    },
    {
      "course_image":"assets/courses/4110826_7f58_3.webp",
      "name": "Database Administration with MySQL",
      "description": "Administration with MySQL.",
      "career": []
    },
    {
      "course_image":'assets/courses/que-es-postgresql.png',
      "name": "PostgreSQL: Modeling and Optimization",
      "description": "PostgreSQL modeling.",
      "career": []
    },
    {
      "course_image":"assets/courses/SQL-Server.avif",
      "name": "Microsoft SQL Server for Analysts",
      "description": "SQL Server for analysts.",
      "career": []
    },
    {
      "course_image":"assets/courses/hq720 (2).jpg",
      "name": "Database Security and Access Control",
      "description": "Security in DB.",
      "career": []
    },
    {
      "course_image":"assets/courses/illu_mangoDB_blog-79.png",
      "name": "MongoDB and NoSQL Databases",
      "description": "MongoDB and NoSQL.",
      "career": []
    },
    {
      "course_image":"assets/courses/maxresdefault (4).jpg",
      "name": "Database Integration with Power BI",
      "description": "Integration with Power BI.",
      "career": []
    },
    {
      "course_image":"assets/courses/automatizar-sql-server-con-conecta-hub.png",
      "name": "Automation of Reports from SQL",
      "description": "Automation of reports.",
      "career": []
    },
    {
      "course_image":"assets/courses/Data-Science-info-1024x647.png",
      "name": "Data Modeling for Data Science",
      "description": "Modeling for data science.",
      "career": []
    }
  ],
  "Semiconductors": [
    {
      "course_image":"assets/courses/temp_image-966.jpg",
      "name": "Fundamentals of Semiconductors",
      "description": "Fundamentals of semiconductors.",
      "career": []
    },
    {
      "course_image":"assets/courses/114-3.png",
      "name": "Semiconductor Devices: Diodes, Transistors, and ICs",
      "description": "Devices such as diodes and transistors.",
      "career": []
    },
    {
      "course_image":"assets/courses/25B_SEMICONDUCTORES_PORTADA-scaled.jpg",
      "name": "Semiconductor Applications in Smartphones",
      "description": "Applications in smartphones.",
      "career": []
    },
    {
      "course_image":"assets/courses/20240709145110501.jpg",
      "name": "CMOS Technology and Nanoelectronics",
      "description": "CMOS technology and nanoelectronics.",
      "career": []
    },
    {
      "course_image":"assets/courses/Wafer-Check_fix1024x469.webp",
      "name": "Quality Control in Semiconductor Manufacturing",
      "description": "Quality control in manufacturing.",
      "career": []
    },
    {
      "course_image":"assets/courses/1846102491915681792.png",
      "name": "Artificial Intelligence in Chip Diagnosis",
      "description": "AI in chip diagnosis.",
      "career": []
    },
    {
      "course_image":"assets/courses/semi-condcutor-.webp",
      "name": "Semiconductor Supply Chain",
      "description": "Supply chain.",
      "career": []
    },
    {
      "course_image":"assets/courses/0623-planet-earth-and-microchip-header-820x410.webp",
      "name": "Global Trends in the Chip Industry",
      "description": "Global trends in chips.",
      "career": []
    }
  ]
};

const executivePrograms = [
  {
    id: 1,
    title: "Digital Transformation Leadership",
    description: "Lead digital innovation and transformation in your organization with cutting-edge strategies",
    duration: "12 weeks",
    participants: "Senior Executives",
    image: "/assets/executive/digital-leadership.jpg",
    badge: "Premium"
  },
  {
    id: 2,
    title: "AI Strategy for Business Leaders",
    description: "Master AI implementation and strategic decision-making for competitive advantage",
    duration: "8 weeks",
    participants: "C-Suite Executives",
    image: "/assets/executive/ai-strategy.jpg",
    badge: "Featured"
  },
  {
    id: 3,
    title: "Data-Driven Executive Decision Making",
    description: "Enhance strategic decisions with advanced data analytics and business intelligence",
    duration: "10 weeks",
    participants: "Directors & VPs",
    image: "/assets/executive/data-driven.jpg",
    badge: "Executive"
  }
];

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const coursesPerPage = 12;
  const { t, language } = useLocalization();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+92',
    phoneNumber: '',
    message: ''
  });

    useEffect(() => {
    // Select course data based on language
    const currentCourseData = language === 'es' ? courseDataEs : courseDataEn;

    // Flatten the data properly
    const courses = [];
    
    for (const category in currentCourseData) {
      const categoryData = currentCourseData[category];
      
      if (Array.isArray(categoryData)) {
        // Direct array of courses (for categories without technologies)
        categoryData.forEach(course => {
          courses.push({
            ...course,
            category: category,
            technology: '', // Empty for categories without technologies
            course_image: course.course_image ? `/${course.course_image}` : '/assets/img/course/default.png',
            // Ensure all searchable fields exist
            name: course.name || '',
            description: course.description || '',
            career: course.career || []
          });
        });
      } else {
        // Object with technology keys (like "Digital Skills Path")
        for (const technology in categoryData) {
          if (Array.isArray(categoryData[technology])) {
            categoryData[technology].forEach(course => {
              courses.push({
                ...course,
                category: category,
                technology: technology,
                course_image: course.course_image ? `/${course.course_image}` : '/assets/img/course/default.png',
                // Ensure all searchable fields exist
                name: course.name || '',
                description: course.description || '',
                career: course.career || []
              });
            });
          }
        }
      }
    }
    
    setAllCourses(courses);
    setFilteredCourses(courses);

    // Extract unique technologies (filter out empty strings)
    const uniqueTechnologies = [...new Set(courses.map(c => c.technology))].filter(tech => tech && tech.trim() !== '');
    setTechnologies(uniqueTechnologies);
  }, [language]);

  // Automatic filtering when filters change
  useEffect(() => {
    let filtered = allCourses;
    
    // Technology filter
    if (selectedTechnology && selectedTechnology !== 'all') {
      filtered = filtered.filter(c => c.technology === selectedTechnology);
    }
    
    // Search filter - enhanced to handle all possible fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(course => {
        // Check all searchable fields
        return (
          (course.name && course.name.toLowerCase().includes(query)) ||
          (course.description && course.description.toLowerCase().includes(query)) ||
          (course.technology && course.technology.toLowerCase().includes(query)) ||
          (course.category && course.category.toLowerCase().includes(query)) ||
          // Search in career array
          (course.career && Array.isArray(course.career) && 
           course.career.some(job => job.toLowerCase().includes(query)))
        );
      });
    }
    
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [selectedTechnology, searchQuery, allCourses]);

  const resetFilters = () => {
    setSelectedTechnology('');
    setSearchQuery('');
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const coursesToDisplay = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setShowSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+92',
      phoneNumber: '',
      message: ''
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+92',
      phoneNumber: '',
      message: ''
    });
    setShowSuccess(false);
  };

  const countries = [
    {"country": "Afghanistan", "code": "+93"},
    {"country": "Åland", "code": "+358"},
    {"country": "Albania", "code": "+355"},
    {"country": "Algeria", "code": "+213"},
    {"country": "American Samoa", "code": "+1"},
    {"country": "Andorra", "code": "+376"},
    {"country": "Angola", "code": "+244"},
    {"country": "Anguilla", "code": "+1"},
    {"country": "Antigua and Barbuda", "code": "+1"},
    {"country": "Argentina", "code": "+54"},
    {"country": "Armenia", "code": "+374"},
    {"country": "Aruba", "code": "+297"},
    {"country": "Ascension Island", "code": "+247"},
    {"country": "Australia", "code": "+61"},
    {"country": "Austria", "code": "+43"},
    {"country": "Azerbaijan", "code": "+994"},
    {"country": "Bahamas", "code": "+1"},
    {"country": "Bahrain", "code": "+973"},
    {"country": "Bangladesh", "code": "+880"},
    {"country": "Barbados", "code": "+1"},
    {"country": "Belarus", "code": "+375"},
    {"country": "Belgium", "code": "+32"},
    {"country": "Belize", "code": "+501"},
    {"country": "Benin", "code": "+229"},
    {"country": "Bermuda", "code": "+1"},
    {"country": "Bhutan", "code": "+975"},
    {"country": "Bolivia", "code": "+591"},
    {"country": "Bosnia and Herzegovina", "code": "+387"},
    {"country": "Botswana", "code": "+267"},
    {"country": "Brazil", "code": "+55"},
    {"country": "British Indian Ocean Territory", "code": "+246"},
    {"country": "British Virgin Islands", "code": "+1"},
    {"country": "Brunei", "code": "+673"},
    {"country": "Bulgaria", "code": "+359"},
    {"country": "Burkina Faso", "code": "+226"},
    {"country": "Burundi", "code": "+257"},
    {"country": "Cambodia", "code": "+855"},
    {"country": "Cameroon", "code": "+237"},
    {"country": "Canada", "code": "+1"},
    {"country": "Cape Verde", "code": "+238"},
    {"country": "Cayman Islands", "code": "+1"},
    {"country": "Central African Republic", "code": "+236"},
    {"country": "Chad", "code": "+235"},
    {"country": "Chile", "code": "+56"},
    {"country": "China", "code": "+86"},
    {"country": "Christmas Island", "code": "+61"},
    {"country": "Cocos Islands", "code": "+61"},
    {"country": "Colombia", "code": "+57"},
    {"country": "Comoros", "code": "+269"},
    {"country": "Cook Islands", "code": "+682"},
    {"country": "Costa Rica", "code": "+506"},
    {"country": "Croatia", "code": "+385"},
    {"country": "Cuba", "code": "+53"},
    {"country": "Curaçao", "code": "+599"},
    {"country": "Cyprus", "code": "+357"},
    {"country": "Czech Republic", "code": "+420"},
    {"country": "Denmark", "code": "+45"},
    {"country": "Djibouti", "code": "+253"},
    {"country": "Dominica", "code": "+1"},
    {"country": "Dominican Republic", "code": "+1"},
    {"country": "Ecuador", "code": "+593"},
    {"country": "Egypt", "code": "+20"},
    {"country": "El Salvador", "code": "+503"},
    {"country": "Equatorial Guinea", "code": "+240"},
    {"country": "Eritrea", "code": "+291"},
    {"country": "Estonia", "code": "+372"},
    {"country": "Ethiopia", "code": "+251"},
    {"country": "Faroe Islands", "code": "+298"},
    {"country": "Fiji", "code": "+679"},
    {"country": "Finland", "code": "+358"},
    {"country": "France", "code": "+33"},
    {"country": "French Guiana", "code": "+594"},
    {"country": "French Polynesia", "code": "+689"},
    {"country": "Gabon", "code": "+241"},
    {"country": "Gambia", "code": "+220"},
    {"country": "Georgia", "code": "+995"},
    {"country": "Germany", "code": "+49"},
    {"country": "Ghana", "code": "+233"},
    {"country": "Gibraltar", "code": "+350"},
    {"country": "Greece", "code": "+30"},
    {"country": "Greenland", "code": "+299"},
    {"country": "Grenada", "code": "+1"},
    {"country": "Guadeloupe", "code": "+590"},
    {"country": "Guam", "code": "+1"},
    {"country": "Guatemala", "code": "+502"},
    {"country": "Guernsey", "code": "+44"},
    {"country": "Guinea", "code": "+224"},
    {"country": "Guinea-Bissau", "code": "+245"},
    {"country": "Guyana", "code": "+592"},
    {"country": "Haiti", "code": "+509"},
    {"country": "Honduras", "code": "+504"},
    {"country": "Hong Kong", "code": "+852"},
    {"country": "Hungary", "code": "+36"},
    {"country": "Iceland", "code": "+354"},
    {"country": "India", "code": "+91"},
    {"country": "Indonesia", "code": "+62"},
    {"country": "Iran", "code": "+98"},
    {"country": "Iraq", "code": "+964"},
    {"country": "Ireland", "code": "+353"},
    {"country": "Isle of Man", "code": "+44"},
    {"country": "Israel", "code": "+972"},
    {"country": "Italy", "code": "+39"},
    {"country": "Ivory Coast", "code": "+225"},
    {"country": "Jamaica", "code": "+1"},
    {"country": "Japan", "code": "+81"},
    {"country": "Jersey", "code": "+44"},
    {"country": "Jordan", "code": "+962"},
    {"country": "Kazakhstan", "code": "+7"},
    {"country": "Kenya", "code": "+254"},
    {"country": "Kiribati", "code": "+686"},
    {"country": "Kosovo", "code": "+383"},
    {"country": "Kuwait", "code": "+965"},
    {"country": "Kyrgyzstan", "code": "+996"},
    {"country": "Laos", "code": "+856"},
    {"country": "Latvia", "code": "+371"},
    {"country": "Lebanon", "code": "+961"},
    {"country": "Lesotho", "code": "+266"},
    {"country": "Liberia", "code": "+231"},
    {"country": "Libya", "code": "+218"},
    {"country": "Liechtenstein", "code": "+423"},
    {"country": "Lithuania", "code": "+370"},
    {"country": "Luxembourg", "code": "+352"},
    {"country": "Macau", "code": "+853"},
    {"country": "Macedonia", "code": "+389"},
    {"country": "Madagascar", "code": "+261"},
    {"country": "Malawi", "code": "+265"},
    {"country": "Malaysia", "code": "+60"},
    {"country": "Maldives", "code": "+960"},
    {"country": "Mali", "code": "+223"},
    {"country": "Malta", "code": "+356"},
    {"country": "Marshall Islands", "code": "+692"},
    {"country": "Martinique", "code": "+596"},
    {"country": "Mauritania", "code": "+222"},
    {"country": "Mauritius", "code": "+230"},
    {"country": "Mayotte", "code": "+262"},
    {"country": "Mexico", "code": "+52"},
    {"country": "Micronesia", "code": "+691"},
    {"country": "Moldova", "code": "+373"},
    {"country": "Monaco", "code": "+377"},
    {"country": "Mongolia", "code": "+976"},
    {"country": "Montenegro", "code": "+382"},
    {"country": "Montserrat", "code": "+1"},
    {"country": "Morocco", "code": "+212"},
    {"country": "Mozambique", "code": "+258"},
    {"country": "Myanmar", "code": "+95"},
    {"country": "Namibia", "code": "+264"},
    {"country": "Nauru", "code": "+674"},
    {"country": "Nepal", "code": "+977"},
    {"country": "Netherlands", "code": "+31"},
    {"country": "New Caledonia", "code": "+687"},
    {"country": "New Zealand", "code": "+64"},
    {"country": "Nicaragua", "code": "+505"},
    {"country": "Niger", "code": "+227"},
    {"country": "Nigeria", "code": "+234"},
    {"country": "Niue", "code": "+683"},
    {"country": "Norfolk Island", "code": "+672"},
    {"country": "North Korea", "code": "+850"},
    {"country": "Northern Mariana Islands", "code": "+1"},
    {"country": "Norway", "code": "+47"},
    {"country": "Oman", "code": "+968"},
    {"country": "Pakistan", "code": "+92"},
    {"country": "Palau", "code": "+680"},
    {"country": "Palestine", "code": "+970"},
    {"country": "Panama", "code": "+507"},
    {"country": "Papua New Guinea", "code": "+675"},
    {"country": "Paraguay", "code": "+595"},
    {"country": "Peru", "code": "+51"},
    {"country": "Philippines", "code": "+63"},
    {"country": "Pitcairn Islands", "code": "+64"},
    {"country": "Poland", "code": "+48"},
    {"country": "Portugal", "code": "+351"},
    {"country": "Puerto Rico", "code": "+1"},
    {"country": "Qatar", "code": "+974"},
    {"country": "Réunion", "code": "+262"},
    {"country": "Romania", "code": "+40"},
    {"country": "Russia", "code": "+7"},
    {"country": "Rwanda", "code": "+250"},
    {"country": "Saint Barthélemy", "code": "+590"},
    {"country": "Saint Helena", "code": "+290"},
    {"country": "Saint Kitts and Nevis", "code": "+1"},
    {"country": "Saint Lucia", "code": "+1"},
    {"country": "Saint Martin", "code": "+1"},
    {"country": "Saint Pierre and Miquelon", "code": "+508"},
    {"country": "Saint Vincent and the Grenadines", "code": "+1"},
    {"country": "Samoa", "code": "+685"},
    {"country": "San Marino", "code": "+378"},
    {"country": "São Tomé and Príncipe", "code": "+239"},
    {"country": "Saudi Arabia", "code": "+966"},
    {"country": "Senegal", "code": "+221"},
    {"country": "Serbia", "code": "+381"},
    {"country": "Seychelles", "code": "+248"},
    {"country": "Sierra Leone", "code": "+232"},
    {"country": "Singapore", "code": "+65"},
    {"country": "Sint Maarten", "code": "+1"},
    {"country": "Slovakia", "code": "+421"},
    {"country": "Slovenia", "code": "+386"},
    {"country": "Solomon Islands", "code": "+677"},
    {"country": "Somalia", "code": "+252"},
    {"country": "South Africa", "code": "+27"},
    {"country": "South Georgia and the South Sandwich Islands", "code": "+500"},
    {"country": "South Korea", "code": "+82"},
    {"country": "South Sudan", "code": "+211"},
    {"country": "Spain", "code": "+34"},
    {"country": "Sri Lanka", "code": "+94"},
    {"country": "Sudan", "code": "+249"},
    {"country": "Suriname", "code": "+597"},
    {"country": "Svalbard and Jan Mayen", "code": "+47"},
    {"country": "Sweden", "code": "+46"},
    {"country": "Switzerland", "code": "+41"},
    {"country": "Syria", "code": "+963"},
    {"country": "Taiwan", "code": "+886"},
    {"country": "Tajikistan", "code": "+992"},
    {"country": "Tanzania", "code": "+255"},
    {"country": "Thailand", "code": "+66"},
    {"country": "Timor-Leste", "code": "+670"},
    {"country": "Togo", "code": "+228"},
    {"country": "Tokelau", "code": "+690"},
    {"country": "Tonga", "code": "+676"},
    {"country": "Trinidad and Tobago", "code": "+1"},
    {"country": "Tristan da Cunha", "code": "+290"},
    {"country": "Tunisia", "code": "+216"},
    {"country": "Turkey", "code": "+90"},
    {"country": "Turkmenistan", "code": "+993"},
    {"country": "Turks and Caicos Islands", "code": "+1"},
    {"country": "Tuvalu", "code": "+688"},
    {"country": "Uganda", "code": "+256"},
    {"country": "Ukraine", "code": "+380"},
    {"country": "United Arab Emirates", "code": "+971"},
    {"country": "United Kingdom", "code": "+44"},
    {"country": "United States", "code": "+1"},
    {"country": "Uruguay", "code": "+598"},
    {"country": "U.S. Virgin Islands", "code": "+1"},
    {"country": "Uzbekistan", "code": "+998"},
    {"country": "Vanuatu", "code": "+678"},
    {"country": "Vatican City", "code": "+39"},
    {"country": "Venezuela", "code": "+58"},
    {"country": "Vietnam", "code": "+84"},
    {"country": "Wallis and Futuna", "code": "+681"},
    {"country": "Yemen", "code": "+967"},
    {"country": "Zambia", "code": "+260"},
    {"country": "Zimbabwe", "code": "+263"}
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      course: selectedCourse.name,
      technology: selectedCourse.technology,
      category: selectedCourse.category,
      fullName: formData.fullName,
      email: formData.email,
      phone: `${formData.countryCode}${formData.phoneNumber}`,
      message: formData.message || 'No additional message provided',
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send inquiry');
      }

      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        countryCode: '+92',
        phoneNumber: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // You might want to show an error message to the user
      alert(t('submitError') || 'Failed to send inquiry. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">


      {/* Executive Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              {t('exclusivePrograms')}
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('executivePrograms')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('executiveProgramsDescription')}
            </p>
          </div>

         
        </div>
      </section>

        {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Enhanced Filter Section */}
          <div className="mb-12">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{t('allCourses')}</h2>
                    <p className="text-gray-600 mt-2">{t('findPerfectCourse')}</p>
                  </div>
                  <div className="text-right mt-4 lg:mt-0">
                    <p className="text-lg font-semibold text-gray-900">
                      {filteredCourses.length} {t('coursesCount')}
                    </p>
                    <p className="text-sm text-gray-600">{t('available')}</p>
                  </div>
                </div>

                {/* Redesigned Filter Section */}
                <div className="flex flex-col lg:flex-row items-end gap-4">
                  {/* Search Filter */}
                  <div className="flex-1 w-full">
                    <Label className="text-sm font-medium mb-2 block text-gray-700">
                      {t('searchCourses') || 'Search Courses'}
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder={t('searchPlaceholder') || 'Search by course name, technology, description...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Technology Filter */}
                  <div className="w-full lg:w-64">
                    <Label className="text-sm font-medium mb-2 block text-gray-700">
                      {t('technology') || 'Technology'}
                    </Label>
                    <Select 
                      value={selectedTechnology} 
                      onValueChange={setSelectedTechnology}
                    >
                      <SelectTrigger className="w-full border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <SelectValue placeholder={t('allTechnologies') || 'All Technologies'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allTechnologies') || 'All Technologies'}</SelectItem>
                        {technologies.map(tech => (
                          <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset Button */}
                  <Button 
                    onClick={resetFilters}
                    variant="outline"
                    className="whitespace-nowrap border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t('resetAll') || 'Reset'}
                  </Button>
                </div>

                {/* Active Filters Display */}
                {(selectedTechnology || searchQuery) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedTechnology && selectedTechnology !== 'all' && (
                      <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        Technology: {selectedTechnology}
                        <button 
                          onClick={() => setSelectedTechnology('')}
                          className="hover:text-blue-900 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    {searchQuery && (
                      <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        Search: "{searchQuery}"
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="hover:text-purple-900 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Debug:</strong> Showing {filteredCourses.length} of {allCourses.length} courses. 
                Search: "{searchQuery}", Technology: "{selectedTechnology}"
              </p>
            </div>
          )}

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {coursesToDisplay.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('noCoursesFound') || 'No courses found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('adjustSearchCriteria') || 'Try adjusting your search terms or filters'}
                </p>
                <Button onClick={resetFilters} variant="outline">
                  {t('resetFilters') || 'Reset Filters'}
                </Button>
              </div>
            ) : (
              coursesToDisplay.map((course, index) => (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={course.course_image || '/assets/img/course/default.png'}
                      alt={course.name}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      priority={index < 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      {course.technology && (
                        <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0 font-semibold">
                          {course.technology}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Bookmark className="w-4 h-4 mr-2" />
                      <span>{course.category}</span>
                    </div>
                    
                    <CardTitle className="text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.name}
                    </CardTitle>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 group/btn"
                      onClick={() => openModal(course)}
                    >
                      <CalendarCheck className="w-5 h-5 mr-2 transition-transform group-hover/btn:scale-110" />
                      {t('bookMySeat') || 'Book My Seat'}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              <Button 
                variant="outline" 
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="rounded-xl px-6 py-3"
              >
                {t('previous') || 'Previous'}
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => changePage(pageNum)}
                    className={`rounded-xl px-6 py-3 ${
                      currentPage === pageNum 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                        : ''
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button 
                variant="outline" 
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="rounded-xl px-6 py-3"
              >
                {t('next') || 'Next'}
              </Button>
            </div>
          )}
        </div>
      </section>


      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t('bookYourSeat')}</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {t('course')}: {selectedCourse?.name}
            </p>
          </DialogHeader>

          {selectedCourse && !showSuccess && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
                <CardHeader>
                  <CardTitle className="text-lg">{t('courseDetails')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>{t('technology')}:</strong> {selectedCourse.technology}</p>
                  <p><strong>{t('category')}:</strong> {selectedCourse.category}</p>
                  <p><strong>{t('description')}:</strong> {selectedCourse.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">{t('careerOpportunities')}:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCourse.career.map((job, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{job}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t('fullName')} <span className="text-destructive">*</span></Label>
                  <Input 
                    id="fullName" 
                    required 
                    placeholder={t('enterFullName')} 
                    className="rounded-xl" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('email')} <span className="text-destructive">*</span></Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="your.email@example.com" 
                    className="rounded-xl" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('phone')} <span className="text-destructive">*</span></Label>
                  <div className="flex space-x-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData({...formData, countryCode: value})}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-[120px] rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.country} ({country.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder={t('phonePlaceholder')}
                      className="flex-1 rounded-xl"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={t('messagePlaceholder')} 
                    className="rounded-xl" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('sendInquiry')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {showSuccess && (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('inquirySentSuccess')}</h3>
              <p className="text-gray-600">{t('thankYouMessage')}</p>
              <Button 
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl"
              >
                {t('close')}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}