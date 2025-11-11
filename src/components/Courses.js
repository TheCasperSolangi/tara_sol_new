"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, Calendar, Clock, Bookmark, GraduationCap, Send } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext';

// Sample course data
const COURSES_DATA = [
  {
        "course_image":"assets/courses/microsoft-certified-azure-ai-fundamentals.jpg",
        "Certificaciones": "Microsoft Azure AI Fundamentals ",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Personas interesadas en aprender sobre IA y los servicios de Azure relacionados.\nProfesionales de ventas, gerentes de proyectos y otros roles no técnicos que deseen comprender cómo la IA puede resolver problemas empresariales.\nEstudiantes y profesionales que buscan iniciar una carrera en inteligencia artificial o ciencia de datos.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante será capaz de comprender los conceptos básicos de inteligencia artificial y sus aplicaciones en Microsoft Azure, incluyendo servicios como visión por computadora, procesamiento de lenguaje natural y agentes conversacionales, facilitando el diseño de soluciones inteligentes básicas en la nube.",
        "Objetivo general": "Brindar a los participantes una base sólida sobre los principios fundamentales de la inteligencia artificial y su implementación práctica mediante servicios de Azure, sin necesidad de experiencia previa en programación",
        "Objetivos específicos": "Reconocer conceptos clave de inteligencia artificial, como aprendizaje automático, visión computacional y NLP.\nExplorar los servicios de IA disponibles en Microsoft Azure, comprendiendo su funcionalidad y casos de uso.\nEvaluar cómo aplicar soluciones de IA en la nube de forma ética y responsable, considerando implicaciones sociales y técnicas.\n",
        "Contenidos": "Describe los workloads de IA y consideraciones\n\nPrincipios fundamentales del aprendizaje automático (ML) en Azure\n\nCapacidades de Visión por Computadora en Azure\n\nCapacidades de Procesamiento de Lenguaje Natural (NLP) en Azure\n\nIA Generativa y Agentes Conversacionales",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "15 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Designing and Implementing a Microsoft Azure AI Solution",
        "course_image":"assets/courses/designing-implementing-an-azure-ai-solution.jpg",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Ingenieros de software: Interesados en integrar capacidades de IA en aplicaciones utilizando servicios de Azure.\nDesarrolladores de soluciones de IA: Que buscan diseñar y desplegar soluciones de IA completas en el ecosistema de Azure.\nProfesionales de TI: Con experiencia en desarrollo y un interés en especializarse en inteligencia artificial aplicada.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar, desarrollar e implementar soluciones de inteligencia artificial usando servicios de Azure, integrando modelos de visión, lenguaje y decisión en aplicaciones escalables y seguras.",
        "Objetivo general": "Desarrollar habilidades técnicas para crear soluciones de IA en Microsoft Azure, utilizando servicios cognitivos, Azure Machine Learning y herramientas de desarrollo para resolver desafíos empresariales mediante la inteligencia artificial.",
        "Objetivos específicos": "Implementar servicios cognitivos de Azure, como visión por computadora, procesamiento de lenguaje natural y reconocimiento de voz.\nDesarrollar y desplegar modelos de machine learning, utilizando Azure Machine Learning y flujos de trabajo automatizados.\nIntegrar soluciones de IA en aplicaciones, asegurando cumplimiento, ética y escalabilidad en entornos reales.\n",
        "Contenidos": "1. Planificar y administrar una solución de IA de Azure\n2. Implementar soluciones de IA generativa\n3. Implementar una solución de agencia\n4. Implementar soluciones de visión artificial\n5. Implementar soluciones de procesamiento del lenguaje natural\n6. Implementar soluciones de minería de conocimiento y extracción de información",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Azure Administrator ",
        "course_image":"assets/courses/az-104t00_-microsoft_.jpg",
        "Área": "Azure Infrastructure",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores de Azure: Responsables de implementar, administrar y supervisar entornos de Azure.\nProfesionales de TI: Con experiencia en administración de sistemas y redes que desean ampliar sus habilidades en la nube.\nConsultores y técnicos de soporte: Que trabajan con soluciones basadas en Azure y buscan formalizar sus conocimientos.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para implementar, administrar y supervisar entornos de nube en Microsoft Azure, gestionando recursos, redes, seguridad y servicios de almacenamiento de forma eficiente y segura.",
        "Objetivo general": "Desarrollar las competencias necesarias para administrar entornos de nube en Azure, asegurando la disponibilidad, el rendimiento y la seguridad de los recursos implementados.\n",
        "Objetivos específicos": "Configurar y administrar servicios de cómputo, redes y almacenamiento en Microsoft Azure.\nImplementar medidas de seguridad y control de acceso, incluyendo gestión de identidades y monitoreo de recursos.\nSupervisar el rendimiento y la disponibilidad de los servicios en la nube, optimizando recursos y solucionando incidencias operativas.\n",
        "Contenidos": "Administrar identidades y gobernanza de Azure\n\nImplementar y administrar el almacenamiento\n\nImplementar y administrar recursos de cómputo de Azure\n\nConfigurar y administrar redes virtuales\n\nSupervisar y mantener recursos de Azure",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Designing Microsoft Azure Infrastructure Solutions",
        "course_image":"assets/courses/az-305-course-designing-microsoft-azure-infrastructure-solutions.jpg",
        "Área": "Azure Infrastructure",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Arquitectos de soluciones en la nube que desean diseñar soluciones de infraestructura en Azure.\nProfesionales de TI con experiencia en administración de Azure que buscan avanzar hacia roles de arquitectura.\nConsultores y líderes técnicos que necesitan traducir requisitos empresariales en soluciones técnicas escalables y seguras.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar, administrar y optimizar soluciones de infraestructura en Microsoft Azure, garantizando rendimiento, seguridad, disponibilidad y escalabilidad en entornos de nube empresarial.",
        "Objetivo general": "Desarrollar competencias para planificar y gestionar soluciones completas de infraestructura en Azure, alineadas con las necesidades de negocio y buenas prácticas en la nube.",
        "Objetivos específicos": "Diseñar e implementar cargas de trabajo seguras y resilientes en Azure, utilizando servicios clave como máquinas virtuales, redes y almacenamiento.\nAdministrar identidades, gobernanza y control de acceso, aplicando Azure Active Directory y políticas de cumplimiento.\nOptimizar el monitoreo, la automatización y la continuidad del negocio, utilizando herramientas de supervisión, recuperación ante desastres y escalabilidad.\n",
        "Contenidos": "Diseñar soluciones de identidad, gobernanza y supervisión\n\nDiseñar soluciones de almacenamiento de datos\n\nDiseñar soluciones de continuidad empresarial\n\nDiseñar soluciones de infraestructura\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Designing and Implementing Microsoft DevOps solutions",
        "course_image":"assets/courses/az-400t00_-designing-and-implementing-microsoft-devops-solutions.jpg",
        "Área": "Azure Digital & App Innovation",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Ingenieros de DevOps: Que buscan implementar prácticas de integración y entrega continuas (CI/CD) en Azure.\nDesarrolladores y administradores de Azure: Interesados en automatizar procesos y mejorar la colaboración entre equipos de desarrollo y operaciones.\nProfesionales de TI: Con experiencia en Azure que desean avanzar hacia roles centrados en DevOps.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá diseñar, implementar y gestionar soluciones DevOps en Azure, optimizando la integración continua, entrega continua y automatización para acelerar el desarrollo y despliegue de aplicaciones.",
        "Objetivo general": "Desarrollar las competencias para crear y administrar pipelines de DevOps en Azure, integrando prácticas y herramientas que mejoren la colaboración y eficiencia en el ciclo de vida del desarrollo de software.\n",
        "Objetivos específicos": "Configurar y gestionar pipelines de CI/CD en Azure DevOps para automatizar compilación, pruebas y despliegues.\nImplementar infraestructura como código (IaC) usando herramientas como ARM templates, Terraform o Bicep para gestionar recursos en Azure.\nSupervisar y optimizar procesos DevOps, garantizando la calidad, seguridad y escalabilidad de las soluciones implementadas.\n",
        "Contenidos": "Diseñar e implementar procesos y comunicaciones\n\nDiseñar e implementar una estrategia de control de código fuente\n\nDiseñar e implementar canalizaciones de compilación y entrega\n\nDesarrollar un plan de seguridad y cumplimiento\n\nImplementar una estrategia de instrumentación",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Azure Security Technologies",
        "course_image":"assets/courses/az-500t00_-microsoft-azure-security-technologies.jpg",
        "Área": "Security",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Ingenieros de seguridad de Azure: Profesionales que implementan, gestionan y supervisan la seguridad en entornos de Azure.\nAdministradores de TI y profesionales de seguridad: Aquellos responsables de la seguridad de los recursos en la nube y que desean ampliar sus conocimientos en las herramientas y servicios de seguridad de Azure.\nConsultores y arquitectos de soluciones: Que asesoran a organizaciones en la implementación de soluciones seguras en la nube utilizando Azure.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para implementar y gestionar soluciones de seguridad en Microsoft Azure, protegiendo identidades, datos, aplicaciones y redes en entornos de nube.",
        "Objetivo general": "Desarrollar las habilidades para diseñar, implementar y administrar estrategias de seguridad en Azure, asegurando la protección y cumplimiento en infraestructuras cloud.",
        "Objetivos específicos": "Implementar controles de identidad y acceso seguros en Azure.\nProteger datos y aplicaciones utilizando tecnologías de seguridad en la nube.\nConfigurar y monitorizar la seguridad de redes y recursos en Azure.\n",
        "Contenidos": "Proteger identidades y accesos\n\nProteger redes\n\nProteger procesos, almacenamiento y bases de datos\n\nProteger Azure mediante Microsoft Defender for Cloud y Microsoft Sentinel\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Designing and Implementing Microsoft Azure Networking Solutions",
        "course_image":"assets/courses/az-700t00-designing-and-implementing-microsoft-azure-networking-solutions.jpg",
        "Área": "Azure Infrastructure",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Ingenieros de redes: Profesionales que buscan especializarse en soluciones de redes en Azure.\nAdministradores de sistemas y arquitectos de soluciones: Aquellos responsables de diseñar e implementar soluciones de red en la nube.\nConsultores y técnicos de soporte: Que trabajan con soluciones basadas en Azure y desean formalizar sus conocimientos en redes.\n",
        "Perfil de salida": "El participante podrá diseñar, implementar y administrar soluciones de red seguras y escalables en Microsoft Azure, asegurando conectividad eficiente entre recursos en la nube y entornos híbridos.",
        "Objetivo general": "Capacitar para planificar, configurar y gestionar infraestructuras de red en Azure que cumplan con los requisitos de seguridad, rendimiento y conectividad empresarial.\n",
        "Objetivos específicos": "Diseñar e implementar redes virtuales y conectividad híbrida en Azure.\nConfigurar políticas de seguridad y control de acceso para proteger las redes.\nSupervisar y optimizar el rendimiento de las soluciones de red en Azure.\n",
        "Contenidos": "Diseñar e implementar la infraestructura de red principal\n\nDiseñar, implementar y gestionar servicios de conectividad\n\nDiseñar e implementar servicios de entrega de aplicaciones\n\nDiseñar e implementar acceso privado a servicios de Azure\n\nDiseñar e implementar servicios de seguridad de red de Azure",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Administering Windows Server Hybrid Core Infrastructure",
        "course_image":"assets/courses/Administering-Windows-Server-Hybrid-Core-Infrastructure.webp",
        "Área": "Azure Infrastructure",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores híbridos de Windows Server: Profesionales que tienen experiencia con Windows Server y desean ampliar las funcionalidades de sus entornos locales combinando tecnologías locales e híbridas .\nProfesionales de TI: Aquellos responsables de implementar y administrar soluciones híbridas y locales, como identidad, administración, cómputo, redes y almacenamiento en un entorno híbrido de Windows Server\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para administrar infraestructuras híbridas de Windows Server, integrando recursos locales y en la nube para garantizar disponibilidad, seguridad y eficiencia operativa.",
        "Objetivo general": "Desarrollar habilidades para implementar, administrar y mantener infraestructuras híbridas basadas en Windows Server, asegurando la continuidad del negocio y la optimización de recursos en entornos locales y en la nube.\n",
        "Objetivos específicos": "Configurar y administrar servicios centrales de Windows Server tanto en entornos locales como híbridos.\nGestionar la conectividad y la integración con servicios en la nube de Microsoft Azure.\nImplementar políticas de seguridad y recuperación ante desastres para mantener la integridad y disponibilidad del sistema.\n",
        "Contenidos": "Desplegar y administrar Active Directory Domain Services (AD DS) en entornos locales y en la nube\n\nAdministrar servidores Windows y cargas de trabajo en un entorno híbrido\n\nAdministrar máquinas virtuales y contenedores\n\nImplementar y administrar una infraestructura de red híbrida\n\nAdministrar servicios de almacenamiento y archivos\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Configuring Windows Server Hybrid Advanced Services",
        "course_image":"assets/courses/AdvanceServices.webp",
        "Área": "Azure Infrastructure",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores híbridos de Windows Server: Profesionales que tienen experiencia con Windows Server y desean ampliar las funcionalidades de sus entornos locales combinando tecnologías locales e híbridas.\nProfesionales de TI: Aquellos responsables de implementar y administrar soluciones híbridas y locales, como identidad, seguridad, administración, cómputo, redes, almacenamiento, supervisión, alta disponibilidad y recuperación ante desastres.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para configurar, administrar y optimizar servicios híbridos de Windows Server, integrando entornos locales y en la nube para mejorar la eficiencia y seguridad de la infraestructura IT.\n",
        "Objetivo general": "Desarrollar habilidades para implementar y gestionar servicios avanzados híbridos de Windows Server, facilitando la administración integrada entre entornos on-premises y Azure.\n",
        "Objetivos específicos": "Configurar servicios avanzados híbridos, como Azure Arc y administración remota para Windows Server.\nImplementar soluciones de alta disponibilidad y recuperación ante desastres en entornos híbridos.\nOptimizar la seguridad y el monitoreo de servidores integrados entre infraestructura local y la nube.\n",
        "Contenidos": "Asegurar infraestructuras de Windows Server locales e híbridas\n\nImplementar y administrar alta disponibilidad de Windows Server\n\nImplementar recuperación ante desastres\n\nMigrar servidores y cargas de trabajo\n\nSupervisar y solucionar problemas de entornos Windows Server\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Azure Fundamentals",
        "course_image":"assets/courses/Azure-Fundamental.png",
        "Área": "Azure Infrastructure",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Profesionales de TI: Que buscan familiarizarse con los conceptos de la nube y Azure.\nEstudiantes: Interesados en iniciar una carrera en tecnologías en la nube.\nGerentes y personal de ventas técnicas: Que desean comprender las capacidades de Azure para tomar decisiones informadas.\nCualquier persona interesada: En aprender sobre los fundamentos de la computación en la nube y los servicios de Azure\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá comprender los conceptos básicos de la nube y los servicios principales de Microsoft Azure, facilitando su uso y adopción en diferentes escenarios tecnológicos.",
        "Objetivo general": "Brindar una comprensión fundamental sobre los servicios en la nube y la plataforma Azure para apoyar la toma de decisiones tecnológicas y de negocio.\n",
        "Objetivos específicos": "Identificar los conceptos básicos de la computación en la nube y sus beneficios.\nDescribir los servicios principales de Microsoft Azure y sus casos de uso.\nReconocer las opciones de seguridad, privacidad y cumplimiento en Azure.\n",
        "Contenidos": "Descripción de conceptos de nube\n\nDescripción de la arquitectura y servicios de Azure\n\nDescripción de la administración y gobernanza en Azure\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "15 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Designing and Implementing a Data Science Solution on Azure",
        "course_image":"assets/courses/Designing-and-Implementing-a-Data-Science-Solution-on-Azure.webp",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Científicos de datos (Data Scientists) que ya trabajan en proyectos de machine learning y desean usar o migrar sus flujos de trabajo a Azure.\nIngenieros de datos y analistas avanzados que deseen automatizar, entrenar y desplegar modelos de ML en entornos empresariales.\nProfesionales de TI con experiencia en Python y ciencia de datos, que buscan especializarse en soluciones en la nube.\nEstudiantes avanzados de ingeniería, informática o carreras afines interesados en aprender cómo llevar modelos de ML desde la experimentación hasta la producción en Azure.\nConsultores y arquitectos de soluciones que diseñan e implementan arquitecturas basadas en modelos de machine learning en la nube.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá diseñar, implementar y optimizar soluciones de ciencia de datos en Azure, utilizando herramientas y servicios para preparar datos, entrenar modelos y desplegar soluciones inteligentes en la nube.",
        "Objetivo general": "Capacitar a los participantes para desarrollar soluciones de ciencia de datos efectivas en Azure, aplicando técnicas de machine learning y análisis avanzado para resolver problemas empresariales.\n",
        "Objetivos específicos": "Preparar y procesar datos en Azure para análisis y modelado.\nEntrenar, evaluar y ajustar modelos de machine learning utilizando servicios de Azure.\nDesplegar y gestionar modelos en producción para soluciones escalables y eficientes.\n",
        "Contenidos": "Diseñar y preparar una solución de aprendizaje automático\n\nExplorar datos y entrenar modelos\n\nPreparar un modelo para su implementación\n\nImplementar y reentrenar un modelo\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Data Engineering on Microsoft Azure ",
        "course_image":"assets/courses/azure-data-engineer-course.jpg",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Profesionales de datos: Aquellos que trabajan con datos y buscan profundizar en la ingeniería de datos en la nube.\nArquitectos de datos: Interesados en diseñar soluciones de datos escalables y eficientes en Azure.\nProfesionales de Business Intelligence (BI): Que desean aprender sobre la creación de soluciones analíticas utilizando tecnologías de plataforma de datos en Azure\nAnalistas de datos y científicos de datos: Que trabajan con soluciones analíticas basadas en Microsoft Azure y desean comprender mejor la infraestructura subyacente.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá diseñar, implementar y gestionar soluciones de ingeniería de datos en Azure, integrando, transformando y asegurando datos para apoyar procesos analíticos y de inteligencia empresarial.",
        "Objetivo general": "Capacitar a los participantes para crear soluciones escalables de procesamiento y almacenamiento de datos en Azure, garantizando la calidad, seguridad y eficiencia en la gestión de datos.\n",
        "Objetivos específicos": "Implementar y optimizar pipelines de datos para ingestión, transformación y carga en entornos Azure.\nDiseñar y gestionar almacenamiento de datos utilizando servicios como Azure Data Lake y Azure Synapse Analytics.\nAsegurar la integridad, seguridad y gobernanza de los datos en soluciones basadas en Azure.\n",
        "Contenidos": "Diseñar e implementar el almacenamiento de datos\n\nDesarrollar procesamiento de datos\n\nAsegurar, supervisar y optimizar almacenamiento y procesamiento de datos\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Fabric Analytics Engineer",
        "course_image":"assets/courses/dp-600t00-microsoft-fabric-analytics-engineer.jpg",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Profesionales de datos: Con experiencia en modelado, extracción y análisis de datos, que buscan profundizar en el uso de Microsoft Fabric para soluciones analíticas.\nAnalistas de datos: Que desean ampliar sus habilidades en la creación de modelos semánticos y análisis de datos utilizando herramientas avanzadas.\nIngenieros de datos: Interesados en implementar y administrar soluciones de análisis de datos a gran escala\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar, implementar y administrar soluciones de análisis de datos utilizando Microsoft Fabric, optimizando la ingesta, procesamiento y visualización de datos para apoyar la toma de decisiones empresariales.\n",
        "Objetivo general": "Desarrollar las habilidades para configurar y gestionar plataformas de análisis de datos en Microsoft Fabric, asegurando procesos eficientes de integración, transformación y análisis de grandes volúmenes de información.\n",
        "Objetivos específicos": "Implementar pipelines de datos y orquestación en Microsoft Fabric para asegurar la ingesta y transformación continua de datos.\nConfigurar entornos y herramientas analíticas para la exploración y visualización de datos.\nOptimizar el rendimiento y la seguridad de las soluciones analíticas en Microsoft Fabric.\n",
        "Contenidos": "Planificar, implementar y administrar una solución de análisis de datos\n\nIngesta y transformación de datos\n\nVisualizar y entregar los datos\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Azure Data Fundamentals",
        "course_image":"assets/courses/dp-900-microsoft-azure-data-fundamentals-course.jpg",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Personas que inician su carrera en el ámbito de los datos: Aquellos que buscan comprender los fundamentos de los datos en la nube.\nProfesionales de TI, estudiantes o perfiles no técnicos: Interesados en adquirir una base sólida en conceptos de bases de datos y análisis de datos en Azure.\nCandidatos a certificaciones avanzadas de Azure: Como Azure Database Administrator Associate o Azure Data Engineer Associate, que desean establecer una base sólida antes de avanzar\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá comprender los conceptos básicos de datos en la nube, incluyendo servicios de bases de datos relacionales y no relacionales, y manejar datos en Microsoft Azure para apoyar soluciones empresariales.",
        "Objetivo general": "Brindar conocimientos fundamentales sobre conceptos de datos y servicios de almacenamiento en la nube, con énfasis en la plataforma Microsoft Azure.\n",
        "Objetivos específicos": "Entender conceptos básicos de datos y bases de datos tanto relacionales como no relacionales.\nConocer los servicios de datos ofrecidos por Microsoft Azure y sus casos de uso.\nFamiliarizarse con conceptos de análisis y procesamiento de datos en la nube.\n",
        "Contenidos": "Describir conceptos básicos de datos\n\nIdentificar consideraciones para datos relacionales en Azure\n\nDescribir consideraciones para datos no relacionales en Azure\n\nDescribir una carga de trabajo analítica en Azure\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "8 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Dynamics 365 Customer service",
        "course_image":"assets/courses/customer-service-overview.png",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "El curso Microsoft Dynamics 365 Customer Service está dirigido principalmente a profesionales que desempeñan el rol de Consultor Funcional de Dynamics 365 Customer Service.",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá configurar y optimizar soluciones de Dynamics 365 Customer Service, mejorando la gestión de atención al cliente y facilitando experiencias de servicio eficientes y personalizadas.",
        "Objetivo general": "Desarrollar competencias para implementar y personalizar funcionalidades de Dynamics 365 Customer Service, alineadas con las necesidades del negocio para optimizar la satisfacción del cliente.",
        "Objetivos específicos": "Configurar casos, colas y rutas para la gestión eficiente de solicitudes de servicio.\nPersonalizar entornos y procesos para mejorar la experiencia del cliente y la productividad del equipo.\nIntegrar herramientas y funcionalidades para un soporte multicanal efectivo y análisis del servicio.\n",
        "Contenidos": "Administrar casos, gestión del conocimiento y retroalimentación\n\nImplementar la programación y enrutamiento\n\nImplementar Dynamics 365 Contact Center\n\nExtender Customer Service usando Microsoft Power Platform\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365 Field Service",
        "course_image":"assets/courses/Picture2.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Consultores funcionales de Dynamics 365 Field Service: Responsables de implementar soluciones que optimicen la programación de recursos y mejoren la eficiencia del servicio en campo.\nProfesionales de TI: Con experiencia o interés en ofrecer soluciones de servicio de campo para clientes de gran escala.\nAdministradores de CRM: Que gestionan soluciones de servicio en grandes organizaciones y buscan integrar funcionalidades de servicio en campo.\nProfesionales de operaciones: Que supervisan equipos móviles y desean mejorar la gestión de órdenes de trabajo y la programación de recursos\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá configurar y gestionar soluciones de Dynamics 365 Field Service, optimizando la planificación, ejecución y monitoreo de servicios en campo para mejorar la experiencia del cliente y la eficiencia operativa.",
        "Objetivo general": "Desarrollar competencias para implementar y personalizar Dynamics 365 Field Service, facilitando la automatización y optimización de procesos de servicio en campo alineados con los objetivos de negocio.\n",
        "Objetivos específicos": "Configurar funcionalidades clave de Field Service como gestión de órdenes, inventarios y recursos.\nOptimizar la programación y despacho de técnicos para mejorar la eficiencia y tiempos de respuesta.\nImplementar monitoreo y análisis para garantizar la calidad del servicio y la satisfacción del cliente.\n",
        "Contenidos": "Configurar aplicaciones de Field Service\n\nAdministrar órdenes de trabajo y activos del cliente\n\nProgramar y despachar órdenes de trabajo\n\nAdministrar la aplicación móvil de Field Service\n\nAdministrar inventario y compras, y Field Service conectado\n\nImplementar Microsoft Power Platform\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365 Finance",
        "course_image":"assets/courses/Microsoft-Dynamics-365-Finance-Operations-U.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Consultores funcionales de Dynamics 365 Finance: Responsables de analizar requisitos empresariales y traducirlos en procesos y soluciones financieras eficientes.\nProfesionales de finanzas y contabilidad: Con conocimientos fundamentales en principios contables y operaciones financieras, interesados en profundizar en la gestión financiera dentro de Dynamics 365.\nEspecialistas en operaciones empresariales: Que buscan optimizar procesos financieros en áreas como manufactura, retail y gestión de la cadena de suministro.\nCandidatos a la certificación Microsoft Certified: Dynamics 365 Finance Functional Consultant Associate: Que desean prepararse para el examen MB-310\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá configurar, gestionar y optimizar procesos financieros y operativos usando Microsoft Dynamics 365 Finance, facilitando la toma de decisiones y el control eficiente de recursos en la organización.",
        "Objetivo general": "Desarrollar habilidades para implementar y administrar soluciones financieras y operativas en Dynamics 365, mejorando la eficiencia y precisión en la gestión empresarial.\n",
        "Objetivos específicos": "Configurar módulos financieros y operativos clave para soportar procesos de contabilidad, presupuesto y operaciones.\nGestionar y optimizar flujos de trabajo financieros, integrando datos para análisis y reportes confiables.\nFacilitar la automatización y el cumplimiento normativo mediante el uso efectivo de herramientas de Dynamics 365.\n",
        "Contenidos": "Configurar y aplicar la gestión financiera\n\nImplementar módulos financieros\n\nConfigurar estructuras contables\n\nAdministrar cierres financieros periódicos\n\nImplementar políticas de costos, conciliación y consolidación\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365 Supply Chain Management",
        "course_image":"assets/courses/product-roundup-post-8.png.webp",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Consultores funcionales de Dynamics 365 Supply Chain Management: Responsables de analizar requisitos empresariales y traducirlos en soluciones eficientes que implementen prácticas recomendadas del sector.\nProfesionales de operaciones y logística: Que desean optimizar procesos de inventario, almacén, transporte y planificación dentro de su organización.\nEspecialistas en manufactura y distribución: Interesados en mejorar la eficiencia operativa mediante la implementación de soluciones tecnológicas avanzadas.\nCandidatos a la certificación Microsoft Certified: Dynamics 365 Supply Chain Management Functional Consultant Associate: Que buscan prepararse para el examen MB-330\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá configurar, implementar y optimizar soluciones de gestión de la cadena de suministro usando Dynamics 365, mejorando la eficiencia operativa y la visibilidad en procesos logísticos y productivos.",
        "Objetivo general": "Desarrollar habilidades para administrar y optimizar procesos de la cadena de suministro mediante la implementación efectiva de funcionalidades de Microsoft Dynamics 365.\n",
        "Objetivos específicos": "Configurar y gestionar módulos clave de la cadena de suministro como inventario, producción y logística en Dynamics 365.\nAnalizar y mejorar procesos operativos para incrementar la eficiencia y reducir costos.\nIntegrar soluciones de Dynamics 365 con otras áreas empresariales para asegurar un flujo de información coherente y efectivo.\n",
        "Contenidos": "Implementar gestión de información de producto\n\nImplementar gestión de inventario y activos\n\nImplementar y administrar procesos de la cadena de suministro\n\nImplementar gestión de almacenes y transporte\n\nImplementar planificación principal (master planning)\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365 Supply Chain Management, Expert",
        "course_image":"assets/courses/banner.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Consultores funcionales avanzados de Dynamics 365 Supply Chain Management: Profesionales que ya poseen experiencia en la plataforma y desean especializarse en características avanzadas.\nArquitectos de soluciones y responsables de operaciones: Que lideran proyectos de transformación digital en áreas de logística y manufactura.\nProfesionales de TI involucrados en la implementación de soluciones complejas de gestión de la cadena de suministro: Que buscan optimizar procesos empresariales mediante el uso de tecnologías avanzadas.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá implementar y optimizar soluciones de gestión de la cadena de suministro usando Dynamics 365, mejorando la eficiencia operativa y la visibilidad en procesos logísticos y productivos.",
        "Objetivo general": "Capacitar a los participantes para diseñar, configurar y gestionar procesos de la cadena de suministro a través de Dynamics 365, alineando tecnología y negocio para optimizar operaciones.\n",
        "Objetivos específicos": "Configurar y administrar módulos clave de Dynamics 365 para la cadena de suministro.\nMejorar la planificación y control de inventarios, producción y logística.\nAplicar mejores prácticas para la integración y análisis de datos en Supply Chain Management.\n",
        "Contenidos": "Configurar productos\n\nConfigurar requisitos previos de producción\n\nImplementar métodos de producción\n\nConfigurar control de producción\n\nImplementar funcionalidades adicionales de la cadena de suministro",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": 32,
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365: Finance and Operations Apps Developer",
        "course_image":"assets/courses/Microsoft-Dynamics-365-Finance-Operations-U.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Desarrolladores de Dynamics 365 Finance and Operations: Profesionales encargados de diseñar, desarrollar, probar y mantener soluciones basadas en D365FO.\nConsultores técnicos de ERP: Especialistas en implementación y personalización de sistemas ERP que desean profundizar en D365FO.\nIngenieros de software y arquitectos de soluciones: Que buscan integrar D365FO con otras aplicaciones y plataformas.\nAsesores y consultores técnicos: Que brindan orientación sobre la implementación y personalización de D365FO.\nLíderes de experiencia de usuario: Interesados en mejorar la interacción del usuario con D365FO.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para desarrollar, personalizar e implementar aplicaciones en Dynamics 365 Finance and Operations, optimizando procesos financieros y operativos mediante soluciones adaptadas a las necesidades del negocio.\n",
        "Objetivo general": "Desarrollar habilidades para crear y mantener aplicaciones personalizadas en Dynamics 365 Finance and Operations, facilitando la automatización y mejora de procesos empresariales.\n",
        "Objetivos específicos": "Diseñar y desarrollar extensiones y personalizaciones en Dynamics 365 Finance and Operations.\nIntegrar aplicaciones con otros sistemas y servicios para garantizar la interoperabilidad.\nImplementar y probar soluciones asegurando su calidad y rendimiento en entornos productivos.\n",
        "Contenidos": "Desarrollar lógica de negocio usando X++\n\nCrear y modificar informes y áreas de trabajo\n\nPersonalizar la interfaz de usuario\n\nProveer endpoints y API para Power Platform y sistemas externos\n\nRealizar pruebas\n\nSupervisar el rendimiento\n\nAnalizar y manipular datos\n\nAdministrar implementaciones usando ALM\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Dynamics 365 Business Central Developer",
        "course_image":"assets/courses/bs-365.png",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Desarrolladores de Business Central: Profesionales encargados de diseñar, desarrollar, probar y mantener soluciones basadas en Business Central.\nConsultores técnicos de ERP: Especialistas en implementación y personalización de sistemas ERP que desean profundizar en Business Central.\nIngenieros de software y arquitectos de soluciones: Que buscan integrar Business Central con otras aplicaciones y plataformas.\nAsesores y consultores técnicos: Que brindan orientación sobre la implementación y personalización de Business Central.\nLíderes de experiencia de usuario: Interesados en mejorar la interacción del usuario con Business Central.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para desarrollar, personalizar e implementar soluciones en Dynamics 365 Business Central, mejorando procesos empresariales mediante la extensión y adaptación de funcionalidades en la plataforma.",
        "Objetivo general": "Desarrollar habilidades para crear y personalizar aplicaciones en Dynamics 365 Business Central, facilitando la automatización y optimización de procesos de negocio en entornos empresariales.",
        "Objetivos específicos": "Configurar y extender funcionalidades estándar usando AL y Visual Studio Code.\nImplementar integraciones y personalizaciones para adaptar la solución a necesidades específicas.\nProbar y desplegar aplicaciones asegurando calidad y rendimiento en entornos productivos.\n",
        "Contenidos": "Diseñar, desarrollar, probar y mantener soluciones basadas en Business Central\n\nExtender funcionalidades mediante extensiones AL\n\nIntegrar Business Central con Power Platform y otras aplicaciones\n\nDepurar y solucionar errores\n\nOptimizar el rendimiento del sistema\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365 Fundamentals Customer Engagement Apps",
        "course_image":"assets/courses/customer-engagement.png",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Profesionales de TI: Que buscan comprender las aplicaciones de compromiso con el cliente de Dynamics 365.\nInteresados en roles relacionados con CRM: Como administradores de CRM, ejecutivos de ventas, representantes de servicio al cliente y especialistas en marketing.\nEstudiantes y personas que buscan cambiar de carrera: Que desean adquirir conocimientos fundamentales sobre las aplicaciones de Dynamics 365 para avanzar en sus carreras.\nEmprendedores y propietarios de negocios: Que buscan mejorar la gestión de relaciones con clientes mediante soluciones tecnológicas.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para comprender y utilizar las funcionalidades básicas de Dynamics 365 Customer Engagement, facilitando la gestión de relaciones con clientes y mejorando procesos comerciales mediante soluciones CRM integradas.",
        "Objetivo general": "Brindar los conocimientos fundamentales para configurar y administrar aplicaciones de Dynamics 365 enfocadas en la gestión de clientes y ventas, apoyando la transformación digital y la mejora del servicio al cliente.\n",
        "Objetivos específicos": "Entender las capacidades y componentes clave de Dynamics 365 Customer Engagement Apps para ventas, marketing y servicio al cliente.\nConfigurar y personalizar funcionalidades básicas para adaptar la solución a las necesidades del negocio.\nUtilizar herramientas para analizar datos y mejorar la interacción con clientes, optimizando procesos comerciales.\n",
        "Contenidos": "Introducción a la interacción con clientes\n\nCapacidades de marketing, ventas y servicio al cliente\n\nField Service y gestión de órdenes de trabajo\n\nUso de Copilot en tareas de engagement\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "12 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Dynamics 365 Fundamentals Finance and Operations App",
        "course_image":"assets/courses/fundamental_finance_and_operations.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Profesionales de TI: Que buscan familiarizarse con las aplicaciones de finanzas y operaciones de Dynamics 365.\nTomadores de decisiones empresariales: Que desean entender cómo Dynamics 365 puede integrarse en sus operaciones.\nEstudiantes y recién graduados: Que buscan adquirir conocimientos fundamentales sobre las aplicaciones de Dynamics 365.\nPersonas que están cambiando de carrera: Que desean aprovechar Dynamics 365 para avanzar en sus trayectorias profesionales\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá comprender y explicar los conceptos clave de las aplicaciones de finanzas y operaciones de Microsoft Dynamics 365, facilitando su uso para mejorar procesos empresariales y apoyar la transformación digital en organizaciones.",
        "Objetivo general": "Brindar conocimientos fundamentales sobre las funcionalidades y beneficios de Microsoft Dynamics 365 Finance and Operations, permitiendo una visión clara de su aplicación en la gestión empresarial y la optimización de procesos ERP.",
        "Objetivos específicos": "Identificar los componentes principales y funcionalidades de Dynamics 365 Finance and Operations.\nEntender cómo Dynamics 365 apoya procesos financieros, de cadena de suministro y operaciones empresariales.\nReconocer el impacto de Dynamics 365 en la transformación digital y la mejora continua de negocios.\n",
        "Contenidos": "Introducción a ERP y gestión financiera\n\nCapacidades de Dynamics 365 Finance\n\nCapacidades de Dynamics 365 Supply Chain Management\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "12 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft 365 Endpoint Administrator",
        "course_image":"assets/courses/md-102t00-microsoft-365-endpoint-administrator-banner.webp",
        "Área": "Modern Work",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores de TI: Encargados de implementar, configurar, proteger, administrar y supervisar dispositivos y aplicaciones cliente en una organización.\nProfesionales que gestionan dispositivos Windows 11 y versiones posteriores: Así como dispositivos no basados en Windows.\nEspecialistas en seguridad y cumplimiento: Que buscan fortalecer la protección de endpoints mediante herramientas como Microsoft Defender for Endpoint.\nProfesionales interesados en la administración moderna de dispositivos: Utilizando tecnologías como Microsoft Intune, Windows Autopilot y Azure Virtual Desktop.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá administrar y proteger dispositivos endpoints en entornos Microsoft 365, asegurando una gestión eficiente, segura y unificada de equipos y aplicaciones.\n",
        "Objetivo general": "Desarrollar competencias para implementar, configurar y gestionar soluciones de administración de endpoints en Microsoft 365, garantizando seguridad y productividad en la organización.",
        "Objetivos específicos": "Configurar y administrar dispositivos y aplicaciones usando Microsoft Endpoint Manager.\nImplementar políticas de seguridad y cumplimiento para proteger endpoints.\nMonitorear y solucionar problemas relacionados con la gestión de dispositivos en Microsoft 365.\n",
        "Contenidos": "Preparar la infraestructura para dispositivos\n\nAdministrar y mantener dispositivos\n\nAdministrar aplicaciones\n\nProteger dispositivos\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft 365 Administrator",
        "course_image":"assets/courses/madministrator.webp",
        "Área": "Modern Work",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores de Microsoft 365: Responsables de implementar, configurar y administrar entornos de Microsoft 365 a nivel de inquilino.\nProfesionales de TI con experiencia en cargas de trabajo de Microsoft 365: Como Exchange Online, SharePoint Online, Microsoft Teams y Microsoft Entra ID (anteriormente Azure Active Directory).\nEspecialistas en seguridad y cumplimiento: Interesados en gestionar la seguridad, las amenazas y el cumplimiento normativo utilizando herramientas como Microsoft Defender y Microsoft Purview.\nPersonas que han obtenido certificaciones asociadas: Como Endpoint Administrator Associate, Messaging Administrator Associate, Teams Administrator Associate, Identity and Access Administrator Associate o Information Protection and Compliance Administrator Associate, y desean avanzar hacia la certificación de nivel experto.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para administrar y optimizar entornos Microsoft 365, gestionando identidades, servicios, seguridad y cumplimiento para asegurar una infraestructura eficiente y segura en la empresa.",
        "Objetivo general": "Desarrollar las competencias para planificar, implementar y administrar soluciones Microsoft 365, garantizando una gestión eficaz de usuarios, dispositivos y políticas de seguridad en entornos empresariales.\n",
        "Objetivos específicos": "Gestionar identidades y accesos, implementando autenticación y autorización segura.\nAdministrar servicios de Microsoft 365, incluyendo Exchange, SharePoint, Teams y OneDrive.\nConfigurar y supervisar seguridad y cumplimiento, aplicando políticas y controles para proteger la información.\n",
        "Contenidos": "Administrar e implementar un tenant de Microsoft 365\n\nImplementar y gestionar identidades y acceso con Microsoft Entra\n\nGestionar seguridad y amenazas con Microsoft Defender XDR\n\nGestionar cumplimiento con Microsoft Purview\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Managing Microsoft Teams",
        "course_image":"assets/courses/blog_post.svg",
        "Área": "Modern Work",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores de Microsoft Teams: Responsables de planificar, implementar, configurar y administrar Microsoft Teams para facilitar una colaboración y comunicación eficaces en un entorno de Microsoft 365.\nProfesionales de TI: Interesados en profundizar sus conocimientos sobre la administración de Teams, incluyendo la gestión de equipos, canales, chats, aplicaciones, reuniones, llamadas y dispositivos certificados para Teams.\nAspirantes a la certificación Microsoft 365 Certified: Teams Administrator Associate: Este curso prepara a los participantes para el examen MS-700, necesario para obtener esta certificación.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá administrar y gestionar Microsoft Teams eficazmente, configurando políticas, seguridad y colaboración para optimizar la comunicación y el trabajo en equipo en entornos empresariales.",
        "Objetivo general": "Desarrollar las habilidades necesarias para implementar, administrar y mantener Microsoft Teams, asegurando un entorno colaborativo seguro y eficiente para usuarios y organizaciones.",
        "Objetivos específicos": "Configurar y gestionar la infraestructura y políticas de Teams, incluyendo permisos, roles y configuración de aplicaciones.\nAdministrar la seguridad y cumplimiento, aplicando controles de acceso y protección de datos en Teams.\nOptimizar la experiencia del usuario y la colaboración, facilitando la integración con otras herramientas y resolviendo problemas comunes.\n",
        "Contenidos": "Planificar la configuración de red para Teams\n\nAdministrar la seguridad y el cumplimiento en Teams\n\nPlanificar y aplicar la gobernanza para Teams\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Collaboration Communications Systems Engineer",
        "course_image":"assets/courses/898962204_1723197846.png",
        "Área": "Modern Work",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Ingenieros de redes y sistemas: Que buscan implementar y administrar soluciones de comunicación unificada basadas en Microsoft Teams.\nAdministradores de TI y de Microsoft 365: Responsables de la configuración y gestión de servicios de comunicación y colaboración en la organización.\nConsultores y arquitectos de soluciones de colaboración: Que diseñan e implementan infraestructuras de comunicación empresarial.\nProfesionales de soporte técnico y operaciones: Encargados de mantener y solucionar problemas en sistemas de comunicación y dispositivos asociados.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar, implementar y gestionar soluciones de comunicación y colaboración en entornos Microsoft, optimizando la experiencia del usuario y asegurando la integración eficiente de sistemas.\n",
        "Objetivo general": "Desarrollar habilidades para administrar infraestructuras de comunicación y colaboración Microsoft, garantizando soluciones seguras, escalables y alineadas con las necesidades empresariales.",
        "Objetivos específicos": "Configurar y administrar plataformas de comunicación como Microsoft Teams y Skype Empresarial.\nImplementar políticas de seguridad y cumplimiento en sistemas de colaboración.\nOptimizar el rendimiento y solucionar problemas en entornos de comunicaciones unificadas.\n",
        "Contenidos": "Planificar y diseñar sistemas de comunicaciones colaborativas\n\nConfigurar y administrar reuniones, seminarios web y town halls de Teams\n\nConfigurar y administrar Teams Phone\n\nConfigurar y administrar dispositivos y salas de Teams Rooms\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft 365 Fundamentals",
        "course_image":"assets/courses/MS-900-1-1024x576.png",
        "Área": "Modern Work",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Profesionales de TI: Que desean adquirir conocimientos fundamentales sobre los servicios de Microsoft 365 y la computación en la nube.\nTomadores de decisiones empresariales: Interesados en comprender cómo Microsoft 365 puede mejorar la productividad y colaboración en sus organizaciones.\nEstudiantes y principiantes: Que buscan introducirse en el mundo de los servicios en la nube y Microsoft 365.\nEmprendedores y gerentes: Que consideran adoptar soluciones de colaboración y productividad en la nube para sus negocios.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante será capaz de comprender los conceptos fundamentales de Microsoft 365, incluyendo sus servicios, beneficios, modelos de suscripción, seguridad, cumplimiento y productividad en la nube.",
        "Objetivo general": "Proporcionar una comprensión básica de los servicios y funcionalidades clave de Microsoft 365, su valor empresarial y cómo apoya el trabajo moderno y seguro en la nube.",
        "Objetivos específicos": "Identificar los componentes y beneficios clave de Microsoft 365, como Teams, Exchange, SharePoint y OneDrive.\nComprender los principios de seguridad, cumplimiento y privacidad integrados en Microsoft 365.\nReconocer las opciones de licenciamiento y soporte, así como los escenarios comunes de uso en organizaciones.\n",
        "Contenidos": "Describir conceptos de nube\n\nDescribir aplicaciones y servicios de Microsoft 365\n\nDescribir seguridad, cumplimiento, privacidad y confianza en Microsoft 365\n\nDescribir precios, licencias y soporte de Microsoft 365\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "12 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Power Platform Functional Consultant",
        "course_image":"assets/courses/pl-200t00-microsoft-power-platform-functional-consultant.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Consultores funcionales: Encargados de traducir las necesidades empresariales en soluciones técnicas utilizando Power Platform.\nAnalistas de negocios: Que buscan automatizar procesos y mejorar la eficiencia operativa mediante herramientas de bajo código.\nProfesionales de TI: Interesados en adquirir habilidades para crear aplicaciones, automatizar flujos de trabajo y analizar datos sin necesidad de programación avanzada.\nDesarrolladores y arquitectos de soluciones: Que desean profundizar en la configuración y personalización de soluciones empresariales con Power Platform.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar, implementar y configurar soluciones de negocio utilizando Microsoft Power Platform, integrando aplicaciones, automatización de procesos, análisis de datos y chatbots para mejorar la eficiencia organizacional.",
        "Objetivo general": "Formar consultores funcionales capaces de crear soluciones empresariales efectivas mediante el uso de Power Apps, Power Automate, Power BI y Power Virtual Agents, alineadas con las necesidades del negocio.",
        "Objetivos específicos": "Desarrollar aplicaciones de negocio con Power Apps que permitan digitalizar procesos y mejorar la experiencia del usuario.\nAutomatizar flujos de trabajo y procesos rutinarios mediante Power Automate, incrementando la productividad.\nImplementar dashboards e informes interactivos con Power BI para apoyar la toma de decisiones basada en datos.\n",
        "Contenidos": "Configurar Microsoft Dataverse\n\nCrear aplicaciones con Power Apps\n\nCrear y administrar lógica y automatización de procesos\n\nGestionar entornos de Power Platform\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Power BI Data Analyst",
        "course_image":"assets/courses/microsoft-certified-power-bi-data-analyst-associate.jpg",
        "Área": "DATA & AI",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Analistas de datos y profesionales de inteligencia empresarial: Que desean aprender a realizar análisis de datos precisos utilizando Power BI.\nPersonas que desarrollan informes: Que visualizan datos de tecnologías de plataforma de datos existentes tanto en la nube como en instalaciones locales.\nEstudiantes y profesionales en evolución: Que buscan iniciarse o actualizar sus habilidades en análisis de datos y Power BI.\nEmpresas innovadoras: Que desean capacitar a su equipo en los fundamentos del análisis de datos para mejorar la eficiencia y la estrategia de negocio\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para preparar, modelar, visualizar y analizar datos utilizando Power BI, generando reportes interactivos que facilitan la toma de decisiones basada en datos.",
        "Objetivo general": "Desarrollar habilidades para transformar datos en información útil, mediante el uso de Power BI, aplicando buenas prácticas de análisis, modelado y visualización.",
        "Objetivos específicos": "Importar, limpiar y transformar datos de diversas fuentes usando herramientas de Power BI.\nCrear modelos de datos eficientes y relaciones entre tablas, aplicando DAX para cálculos y medidas.\nDiseñar visualizaciones interactivas y dashboards que comuniquen hallazgos clave de forma clara y efectiva.\n",
        "Contenidos": "Preparar datos\n\nModelar datos\n\nVisualizar y analizar datos\n\nAdministrar y proteger Power BI\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "21 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Power Platform Developer",
        "course_image":"assets/courses/Featured-image-power-platform-1024x643.png",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Desarrolladores de software: Con experiencia en lenguajes como C#, JavaScript, TypeScript y HTML, interesados en crear soluciones personalizadas en Power Platform.\nConsultores técnicos y arquitectos de soluciones: Que trabajan en la implementación y personalización de aplicaciones empresariales utilizando Power Platform.\nProfesionales de TI: Que buscan integrar y extender las funcionalidades de Power Platform con otros servicios y sistemas.\nEquipos de desarrollo de aplicaciones empresariales: Que desean mejorar la productividad y eficiencia mediante la automatización de procesos y la creación de aplicaciones personalizadas.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para crear, extender y personalizar soluciones con Microsoft Power Platform, integrando aplicaciones, automatización, inteligencia artificial y datos para mejorar procesos empresariales.",
        "Objetivo general": "Desarrollar habilidades para construir soluciones completas en Power Platform que optimicen la productividad y resuelvan necesidades de negocio mediante el uso de Power Apps, Power Automate, Power BI y Power Virtual Agents.",
        "Objetivos específicos": "Diseñar e implementar aplicaciones personalizadas utilizando Power Apps con componentes personalizados y lógicas complejas.\nAutomatizar procesos empresariales mediante flujos de trabajo con Power Automate e integración con servicios externos.\nExtender las capacidades de la plataforma usando conectores personalizados, APIs, y Azure para soluciones avanzadas.\n",
        "Contenidos": "Diseñar una arquitectura técnica\n\nConstruir soluciones con Power Platform\n\nImplementar mejoras en Power Apps\n\nExtender la experiencia de usuario\n\nExtender la plataforma\n\nDesarrollar integraciones \n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "24 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Power Automate RPA Developer",
        "course_image":"assets/courses/pl-500t00-microsoft-power-automate-rpa-developer.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Desarrolladores de software: Interesados en diseñar, desarrollar, implementar y mantener soluciones de automatización robótica de procesos (RPA) utilizando Microsoft Power Automate.\nAnalistas de procesos y profesionales de TI: Que buscan optimizar y automatizar flujos de trabajo empresariales para mejorar la eficiencia operativa.\nConsultores y arquitectos de soluciones: Que colaboran con partes interesadas del negocio para identificar oportunidades de automatización y desarrollar soluciones efectivas.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar, desarrollar y mantener soluciones de automatización robótica de procesos (RPA) con Microsoft Power Automate, optimizando tareas repetitivas y mejorando la eficiencia operativa en entornos empresariales.",
        "Objetivo general": "Capacitar al participante para crear flujos de trabajo automatizados que integren aplicaciones y servicios utilizando Power Automate, aplicando prácticas de RPA para la transformación digital de procesos.\n",
        "Objetivos específicos": "Diseñar y construir flujos automatizados mediante Power Automate Desktop y servicios en la nube.\nIntegrar RPA con sistemas y datos empresariales, usando conectores, expresiones y acciones personalizadas.\nAdministrar, depurar y optimizar soluciones de RPA, garantizando escalabilidad, seguridad y mantenimiento continuo.\n",
        "Contenidos": "Diseñar automatizaciones\n\nDesarrollar automatizaciones\n\nImplementar y gestionar automatizaciones \n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "32 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Power Platform Solution Architect",
        "course_image":"assets/courses/6003144_28da.webp",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Consultores senior, tanto funcionales como técnicos, que aspiran a convertirse en arquitectos de soluciones.\nArquitectos de soluciones actuales que son nuevos en el rol o desean formalizar y profundizar sus conocimientos en la arquitectura de soluciones con Power Platform\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará preparado para diseñar soluciones empresariales completas utilizando Microsoft Power Platform, integrando aplicaciones, automatizaciones, análisis de datos e inteligencia artificial, alineadas con las necesidades estratégicas del negocio.",
        "Objetivo general": "Formar expertos capaces de definir la arquitectura, guiar decisiones técnicas y liderar implementaciones de soluciones en Power Platform, asegurando alineación con los objetivos del cliente y mejores prácticas de Microsoft.",
        "Objetivos específicos": "Diseñar arquitecturas técnicas y funcionales robustas utilizando Power Apps, Power Automate, Power BI y Power Virtual Agents.\nGuiar equipos de desarrollo y negocio en la implementación de soluciones escalables, seguras y centradas en el usuario.\nIntegrar Power Platform con otros servicios de Microsoft y de terceros, optimizando procesos y mejorando la experiencia del usuario final.\n",
        "Contenidos": "Realizar el diseño de la visión y análisis de requisitos\n\nArquitectura de la solución\n\nImplementar la solución \n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "27 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Power Platform Fundamentals",
        "course_image":"assets/courses/pl-900t00_-microsoft-power-platform-fundamentals.jpg",
        "Área": "Business Applications",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Usuarios empresariales y profesionales de negocio: Que buscan mejorar la productividad mediante la automatización de procesos, análisis de datos y creación de aplicaciones sencillas.\nEstudiantes y recién graduados: Interesados en adquirir conocimientos fundamentales sobre la Power Platform para iniciar una carrera en tecnología o análisis de datos.\nProfesionales de TI y desarrolladores: Que desean obtener una comprensión básica de las capacidades de la Power Platform para integrarlas en soluciones más amplias.\nConsultores y analistas de negocio: Que buscan comprender cómo las herramientas de la Power Platform pueden ser aplicadas para resolver desafíos empresariales.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para comprender y utilizar los componentes fundamentales de Microsoft Power Platform, permitiéndole automatizar procesos, analizar datos y crear soluciones empresariales simples sin necesidad de programación avanzada.",
        "Objetivo general": "Brindar una comprensión básica de las herramientas de Power Platform para mejorar la productividad empresarial mediante la automatización, el análisis de datos y la creación de aplicaciones personalizadas.\n",
        "Objetivos específicos": "Identificar y explicar los componentes clave de Power Platform, incluyendo Power BI, Power Apps, Power Automate y Power Virtual Agents.\nReconocer cómo estas herramientas se integran entre sí y con otros servicios de Microsoft 365 y Azure.\nComprender los beneficios de aplicar Power Platform para resolver problemas empresariales comunes mediante soluciones digitales accesibles.\n",
        "Contenidos": "Describir el valor del negocio de Power Platform\n\nGestionar el entorno de Power Platform\n\nDemostrar las capacidades de Power Apps\n\nDemostrar las capacidades de Power Automate\n\nDemostrar las capacidades de Power Pages",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "12 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Cybersecurity Architect",
        "course_image":"assets/courses/1673368160553.png",
        "Área": "Security",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Arquitectos de ciberseguridad: Que desean profundizar en el diseño de arquitecturas de seguridad basadas en los principios de Zero Trust y en la implementación de soluciones de seguridad para infraestructuras híbridas y multicloud.\nIngenieros de seguridad en la nube: Con experiencia en la implementación de soluciones de seguridad en plataformas como Azure, Microsoft 365 y otros servicios en la nube.\nConsultores de seguridad: Que asesoran a organizaciones en la creación de estrategias de seguridad, cumplimiento normativo y operaciones de seguridad.\nProfesionales de TI con enfoque en seguridad: Como administradores de sistemas, ingenieros de redes y analistas de operaciones de seguridad, que buscan especializarse en la arquitectura de soluciones de ciberseguridad.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para diseñar e implementar arquitecturas de ciberseguridad integrales en entornos Microsoft, protegiendo identidades, datos, aplicaciones e infraestructuras frente a amenazas avanzadas.",
        "Objetivo general": "Formar profesionales capaces de definir estrategias y soluciones de seguridad empresarial, alineadas con las mejores prácticas de Microsoft y enfocadas en la protección proactiva y la resiliencia organizacional.",
        "Objetivos específicos": "Diseñar soluciones de seguridad en la nube y entornos híbridos, incluyendo protección de identidades, endpoints, redes y cargas de trabajo.\nIntegrar herramientas de seguridad de Microsoft como Defender, Sentinel, Purview y Entra en una arquitectura unificada.\nEstablecer políticas de gobernanza y respuesta ante incidentes, garantizando cumplimiento normativo y reducción de riesgos.\n",
        "Contenidos": "Diseñar soluciones alineadas con prácticas de seguridad (Zero Trust)\n\nDiseñar operaciones de seguridad, identidad y cumplimiento\n\nDiseñar seguridad para infraestructura\n\nDiseñar seguridad para aplicaciones y datos ",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "21 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Security Operations Analyst",
        "course_image":"assets/courses/images.jpeg",
        "Área": "Security",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Analistas de operaciones de seguridad que investigan, responden y buscan amenazas usando herramientas como Microsoft Sentinel, Microsoft Defender XDR y Defender for Cloud.\nIngenieros de seguridad que implementan y gestionan soluciones de seguridad en entornos híbridos y en la nube.\nConsultores de seguridad que asesoran a organizaciones en protección y mitigación de riesgos.\nAdministradores de sistemas y redes que gestionan infraestructuras tecnológicas y desean fortalecer la seguridad de sus entornos.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para monitorear, detectar, investigar y responder a amenazas de seguridad en entornos híbridos, utilizando soluciones como Microsoft Sentinel, Defender y otras herramientas de Microsoft 365.",
        "Objetivo general": "Formar profesionales capaces de proteger entornos empresariales mediante la gestión de alertas, la respuesta a incidentes y la mejora continua de las operaciones de seguridad con tecnologías Microsoft.\n",
        "Objetivos específicos": "Implementar y configurar herramientas de monitoreo de seguridad, como Microsoft Sentinel y Defender for Endpoint.\nInvestigar y responder a incidentes de seguridad, utilizando técnicas de análisis forense y correlación de datos.\nReducir riesgos y fortalecer la postura de seguridad mediante la automatización de tareas y la aplicación de políticas proactivas.\n",
        "Contenidos": "Administrar un entorno de operaciones de seguridad\n\nConfigurar protección y detección\n\nGestionar la respuesta a incidentes\n\nGestionar amenazas de seguridad\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "21 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Identity and Access Administrator",
        "course_image":"assets/courses/microsoft-certified-identity-and-access-administrator-associate.jpg",
        "Área": "Security",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores de identidad y acceso: Responsables de diseñar, implementar y operar sistemas de gestión de identidades y accesos en una organización, utilizando Microsoft Entra ID (anteriormente Azure Active Directory).\nIngenieros de seguridad y profesionales de TI: Que buscan profundizar en la implementación de soluciones de identidad y acceso, y desempeñar un papel integral en la protección de la organización.\nProfesionales que planean obtener la certificación SC-300: Y desean prepararse adecuadamente para el examen asociado.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante estará capacitado para gestionar identidades, acceso y protección de usuarios en entornos Microsoft, implementando soluciones seguras y eficientes con Azure Active Directory (Entra ID) y servicios relacionados.\n",
        "Objetivo general": "Desarrollar competencias para diseñar, implementar y administrar soluciones de identidad y control de acceso en entornos Microsoft 365 y Azure, garantizando seguridad, cumplimiento y experiencia de usuario.",
        "Objetivos específicos": "Gestionar identidades y autenticación utilizando Azure AD, incluyendo usuarios, grupos, y sincronización híbrida.\nImplementar políticas de acceso condicional y autenticación multifactor, reforzando la seguridad en el acceso a recursos.\nSupervisar, solucionar problemas y proteger entornos de identidad, aplicando prácticas de gobernanza y cumplimiento.\n",
        "Contenidos": "Implementar y administrar identidades de usuario\n\nImplementar autenticación y administración de accesos\n\nPlanificar e implementar identidades de carga de trabajo\n\nPlanificar y automatizar la gobernanza de identidades\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "21 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Information Protection Administrator",
        "course_image":"assets/courses/150252466_1743676187.webp",
        "Área": "Security",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Administradores de protección de la información: Responsables de traducir los requisitos de riesgo y cumplimiento de una organización en implementaciones técnicas.\nProfesionales de cumplimiento y seguridad: Que trabajan en la implementación y gestión de soluciones para clasificación de contenido, prevención de pérdida de datos (DLP), protección de la información, gestión del ciclo de vida de los datos, gestión de registros, privacidad y cumplimiento.\nColaboradores interfuncionales: Que colaboran con roles responsables de gobernanza, datos y seguridad para evaluar y desarrollar políticas que aborden los objetivos de reducción de riesgos y cumplimiento de una organización.\nAsistentes a administradores de cargas de trabajo y partes interesadas legales: Que ayudan a implementar soluciones tecnológicas que respaldan las políticas y controles necesarios.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá implementar y gestionar soluciones de protección de información en entornos Microsoft, asegurando la confidencialidad, integridad y cumplimiento de datos sensibles en la organización.",
        "Objetivo general": "Desarrollar las competencias para diseñar, configurar y administrar políticas de protección de información, alineadas con las necesidades de seguridad y normativas corporativas en Microsoft 365 y Azure.",
        "Objetivos específicos": "Configurar etiquetas de sensibilidad y políticas de protección para clasificar y proteger datos críticos.\nImplementar soluciones de prevención de pérdida de datos (DLP) y supervisión de información confidencial.\nGestionar el acceso y cumplimiento de normativas mediante auditorías, reportes y controles en Microsoft Information Protection.\n",
        "Contenidos": "Implementar protección de la información\n\nImplementar prevención de pérdida de datos y retención\n\nGestionar riesgos, alertas y actividades\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "21 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    },
    {
        "Certificaciones": "Microsoft Security, Compliance, and Identity Fundamentals",
        "course_image":"assets/courses/MC-Security-Compliance-Identity-Fundamentals.webp",
        "Área": "Security",
        "Ente Certificador": "Microsoft",
        "Dirigido a / Perfil de entrada": "Usuarios empresariales y profesionales no técnicos interesados en conocer los conceptos fundamentales de seguridad y cumplimiento, especialmente en entornos basados en la nube.\nNuevos profesionales de TI o estudiantes que están comenzando su carrera en ciberseguridad o administración de sistemas.\nPersonas que trabajan en áreas de gobernanza, gestión de riesgos, cumplimiento normativo o protección de datos, y que necesitan comprender cómo Microsoft aborda estos temas.\nAspirantes a certificaciones Microsoft más avanzadas, como SC-200 (Security Operations Analyst), SC-300 (Identity and Access Administrator) o SC-400 (Information Protection Administrator), ya que SC-900 proporciona una base sólida.\n",
        "Perfil de salida": "Al finalizar la certificación, el participante podrá comprender y aplicar conceptos básicos de seguridad, cumplimiento e identidad en entornos Microsoft, ayudando a proteger datos y gestionar riesgos en la nube y on-premises.",
        "Objetivo general": "Proporcionar conocimientos fundamentales sobre seguridad, cumplimiento y gestión de identidades para proteger recursos en plataformas Microsoft.",
        "Objetivos específicos": "Entender los principios básicos de seguridad y protección de datos en Microsoft 365 y Azure.\nConocer las herramientas y prácticas para garantizar el cumplimiento normativo y la privacidad.\nGestionar identidades y accesos para mantener la seguridad en entornos híbridos y en la nube.\n",
        "Contenidos": "Describir los conceptos de seguridad, cumplimiento e identidad\n\nDescribir las capacidades de Microsoft Entra\n\nDescribir las capacidades de soluciones de seguridad de Microsoft\n\nDescribir las capacidades de soluciones de cumplimiento de Microsoft\n",
        "Vigencia Certificación": "No expira",
        "Cantidad de horas de capacitación": "12 horas",
        "Metodología (examen o proyecto)": "Examen",
        "Cantidad de intentos": "1 intento con posibilidad de un segundo intento. (El monto dependerá del examen que se desea repetir)",
        "Modalidad": "Modalidad virtual en vivo"
    }
];

const CourseCard = ({ course, onBookSeat }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLocalization();

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden rounded-3xl border border-gray-200 transition-all duration-300 hover:shadow-lg h-full">
        <div className="relative h-48 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${course.course_image})` }}
          />
        </div>

        <CardContent className="p-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-2">{course["Ente Certificador"]}</p>
          <h3 className="font-semibold text-lg mb-6 line-clamp-2 min-h-[56px]">
            {course.Certificaciones}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-400">{course["Área"]}</span>
            </div>
            <p className="font-bold text-purple-600">{course["Cantidad de horas de capacitación"]}</p>
          </div>
        </CardContent>

        <div 
          className={`absolute inset-0 bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 overflow-y-auto ${
            isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <p className="text-gray-500 text-sm mb-2">{course["Ente Certificador"]}</p>
          <h3 className="font-semibold text-lg mb-4">{course.Certificaciones}</h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {course["Objetivo general"] || t('courseDefaultDescription')}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">{course["Modalidad"]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{course["Cantidad de horas de capacitación"]}</span>
            </div>
          </div>

          <Button 
            onClick={() => onBookSeat(course.Certificaciones)}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t('bookMySeat')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

const BookingModal = ({ isOpen, onClose, courseName, courseDetails }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { t } = useLocalization();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          course: courseName,
          technology: courseDetails?.technology || 'Not specified',
          category: courseDetails?.category || 'Not specified',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send inquiry');
      }

      console.log('Booking submitted:', { ...formData, course: courseName });
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || t('submitError') || 'Failed to send inquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setSubmitError('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{t('bookYourSeat')}</DialogTitle>
              <p className="text-sm text-gray-500">
                {t('course')}: <span className="font-semibold">{courseName}</span>
              </p>
              {courseDetails?.technology && (
                <p className="text-sm text-gray-500">
                  {t('technology')}: <span className="font-semibold">{courseDetails.technology}</span>
                </p>
              )}
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {t('fullName')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder={t('enterFullName')}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {t('email')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  {t('phone')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder={t('phonePlaceholder')}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={t('messagePlaceholder')}
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    {submitError}
                  </p>
                </div>
              )}

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('sending') || 'Sending...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    {t('sendInquiry')}
                  </div>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{t('inquirySentSuccess')}</h3>
            <p className="text-gray-600 mb-4">{t('thankYouMessage')}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Confirmation email sent to: <span className="font-semibold">{formData.email}</span></p>
              <p>We'll contact you within 24 hours</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default function CourseListing() {
  const [filters, setFilters] = useState({
    area: '',
    certifier: '',
    duration: '',
    modality: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const coursesPerPage = 12;
  const { t } = useLocalization();

  const filterOptions = useMemo(() => ({
    areas: [...new Set(COURSES_DATA.map(c => c["Área"]).filter(Boolean))],
    certifiers: [...new Set(COURSES_DATA.map(c => c["Ente Certificador"]).filter(Boolean))],
    durations: [...new Set(COURSES_DATA.map(c => c["Cantidad de horas de capacitación"]).filter(Boolean))],
    modalities: [...new Set(COURSES_DATA.map(c => c["Modalidad"]).filter(Boolean))]
  }), []);

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      return (
        (!filters.area || course["Área"] === filters.area) &&
        (!filters.certifier || course["Ente Certificador"] === filters.certifier) &&
        (!filters.duration || course["Cantidad de horas de capacitación"] === filters.duration) &&
        (!filters.modality || course["Modalidad"] === filters.modality)
      );
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handleBookSeat = (courseName) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setFilters({ area: '', certifier: '', duration: '', modality: '' });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {t('courseListingTitle', { count: filteredCourses.length })}
          </h1>
          <p className="text-gray-600">
            {t('courseListingDescription')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <Label className="text-sm mb-2 block">{t('category')}</Label>
              <Select value={filters.area} onValueChange={(value) => setFilters({...filters, area: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.areas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm mb-2 block">{t('certifier')}</Label>
              <Select value={filters.certifier} onValueChange={(value) => setFilters({...filters, certifier: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.certifiers.map(cert => (
                    <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm mb-2 block">{t('duration')}</Label>
              <Select value={filters.duration} onValueChange={(value) => setFilters({...filters, duration: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.durations.map(dur => (
                    <SelectItem key={dur} value={dur}>{dur}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm mb-2 block">{t('modality')}</Label>
              <Select value={filters.modality} onValueChange={(value) => setFilters({...filters, modality: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.modalities.map(mod => (
                    <SelectItem key={mod} value={mod}>{mod}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => setCurrentPage(1)}
              className="bg-purple-600 hover:bg-purple-700 mt-6"
            >
              {t('filter')}
            </Button>

            <Button 
              onClick={resetFilters}
              variant="outline"
              className="mt-6"
            >
              {t('reset')}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedCourses.map((course, index) => (
            <CourseCard 
              key={index} 
              course={course}
              onBookSeat={handleBookSeat}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              {t('prev')}
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "bg-purple-600" : ""}
              >
                {String(i + 1).padStart(2, '0')}
              </Button>
            ))}
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              {t('next')}
            </Button>
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseName={selectedCourse}
      />

      <style jsx global>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease;
        }
      `}</style>
    </div>
  );
}