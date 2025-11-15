"use client";

import React, { useState, useMemo, useContext } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, Calendar, Clock, Bookmark, GraduationCap, Send, X, Search, RefreshCcw, RefreshCw } from 'lucide-react'; // Added X import assuming it's needed
import { useLocalization, LocalizationContext } from '../context/LocalizationContext';

// Sample course data in Spanish
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
    },
    // Additional Courses

//     {
// "course_image":"assets/courses/certified_tester_foundation_level.jpg",
// "Certificaciones": "Certified Software Tester - Foundation Level (CSTFL)",
// "Área": "PRUEBAS DE SOFTWARE",
// "Ente Certificador": "ISTQB",
// "Dirigido a / Perfil de entrada": "Profesionales involucrados en pruebas de software.\nTesters principiantes, desarrolladores y analistas que deseen adquirir conocimientos básicos en testing.\nEstudiantes y profesionales que buscan iniciar una carrera en calidad de software.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de demostrar conocimiento práctico de los conceptos fundamentales de las pruebas de software, incluyendo principios, procesos y técnicas básicas para asegurar la calidad del software.",
// "Objetivo general": "Proporcionar a los participantes una base sólida sobre los principios fundamentales de las pruebas de software y su implementación práctica, sin necesidad de experiencia previa extensa.",
// "Objetivos específicos": "Reconocer conceptos clave de pruebas de software, como principios de testing y ciclo de vida.\nExplorar técnicas de pruebas estáticas y dinámicas disponibles.\nEvaluar cómo aplicar herramientas y gestión en pruebas de software de manera ética y responsable.\n",
// "Contenidos": "Fundamentos de las pruebas\n\nPruebas a lo largo del ciclo de vida del software\n\nTécnicas estáticas\n\nTécnicas de diseño de pruebas\n\nGestión de pruebas\n\nSoporte de herramientas para pruebas",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "24 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "Intentos ilimitados con pago por repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_5129.png",
// "Certificaciones": "IMTQN Certified Mobile Application Tester (CMAT)",
// "Área": "PRUEBAS DE APLICACIONES MÓVILES",
// "Ente Certificador": "GAQM / IMTQN",
// "Dirigido a / Perfil de entrada": "Profesionales en pruebas de aplicaciones móviles.\nTesters de dispositivos y software que deseen especializarse en mobile testing.\nDesarrolladores y profesionales que buscan validar habilidades en testing de apps.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de validar conocimientos en pruebas de aplicaciones móviles, cubriendo testing de dispositivos, rendimiento y seguridad.",
// "Objetivo general": "Brindar a los participantes una base sólida sobre los principios de pruebas en aplicaciones móviles y su implementación práctica mediante estándares internacionales.",
// "Objetivos específicos": "Reconocer conceptos clave de mobile testing, como herramientas y metodologías.\nExplorar funcionalidades de testing en plataformas móviles.\nEvaluar aplicaciones móviles de forma ética, considerando seguridad y rendimiento.\n",
// "Contenidos": "Introducción a pruebas móviles\n\nHerramientas y metodologías de testing\n\nTesting de rendimiento y seguridad\n\nPruebas en dispositivos y emuladores\n\nCasos de uso en mobile apps",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "2 intentos",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/12-1.webp",
// "Certificaciones": "Certified Agile Scrum Master (CASM)",
// "Área": "GESTIÓN ÁGIL",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales interesados en metodologías ágiles.\nGerentes de proyectos y equipos que deseen implementar Scrum.\nEstudiantes y profesionales que buscan roles en gestión ágil.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de comprender y aplicar el marco Scrum, facilitando equipos ágiles y resolviendo problemas en proyectos.",
// "Objetivo general": "Proporcionar a los participantes conocimientos sólidos sobre principios ágiles y Scrum para liderar equipos efectivamente.",
// "Objetivos específicos": "Reconocer conceptos clave de Scrum y metodologías ágiles.\nExplorar roles, eventos y artefactos en Scrum.\nEvaluar la aplicación de Scrum en proyectos de manera responsable.\n",
// "Contenidos": "Principios ágiles y Scrum\n\nRoles en Scrum\n\nEventos y artefactos\n\nGestión de proyectos ágiles\n\nMejora continua",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/certified-scrum-product-owner-igmguru_2063797947_l.jpg",
// "Certificaciones": "Certified Agile Scrum Product Owner (CASPO)",
// "Área": "GESTIÓN ÁGIL",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en roles de producto.\nGerentes que gestionan backlogs y priorizan valor.\nEstudiantes interesados en ownership ágil.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de priorizar valor para el cliente y gestionar backlogs en entornos Scrum.",
// "Objetivo general": "Enseñar a los participantes cómo maximizar el valor del producto utilizando Scrum.",
// "Objetivos específicos": "Reconocer el rol del Product Owner en Scrum.\nExplorar técnicas de gestión de backlogs.\nEvaluar decisiones éticas en priorización de productos.\n",
// "Contenidos": "Rol del Product Owner\n\nGestión de backlogs\n\nPriorización de valor\n\nColaboración con equipos\n\nMejora de productos",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Practitioner.jpg",
// "Certificaciones": "Certified SAFe Practitioner (CSP)",
// "Área": "GESTIÓN ÁGIL A ESCALA",
// "Ente Certificador": "GAQM / Scaled Agile",
// "Dirigido a / Perfil de entrada": "Miembros de equipos en Agile Release Trains.\nProfesionales en entornos ágiles a escala.\nEstudiantes buscando escalar Agile.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de colaborar en Agile Release Trains y entregar valor en entornos SAFe.",
// "Objetivo general": "Proporcionar conocimientos para trabajar en entornos SAFe y Agile a escala.",
// "Objetivos específicos": "Reconocer conceptos de SAFe y Agile Release Trains.\nExplorar roles en SAFe.\nEvaluar aplicación ética de SAFe en organizaciones.\n",
// "Contenidos": "Introducción a SAFe\n\nAgile Release Trains\n\nRoles y responsabilidades\n\nEntrega de valor\n\nMejora continua",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Call-Centre-Associate-CCCA.jpg",
// "Certificaciones": "Certified Call Centre Associate (CCCA)",
// "Área": "SERVICIO AL CLIENTE",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Agentes de call center.\nProfesionales en atención telefónica.\nEstudiantes interesados en servicio al cliente.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de manejar llamadas efectivamente, escuchando y resolviendo problemas.",
// "Objetivo general": "Mejorar habilidades en manejo telefónico y servicio al cliente.",
// "Objetivos específicos": "Reconocer técnicas de escucha y comunicación.\nExplorar estrategias de resolución de problemas.\nEvaluar interacciones éticas en call centers.\n",
// "Contenidos": "Técnicas de comunicación telefónica\n\nEscucha activa\n\nResolución de problemas\n\nManejo de clientes difíciles\n\nMejora de servicio",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "15 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "Intentos ilimitados",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/customer-service-prof-course.png",
// "Certificaciones": "Certified Customer Service Professional (CCSP)",
// "Área": "SERVICIO AL CLIENTE",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en servicio al cliente.\nGerentes de atención al cliente.\nEstudiantes en roles de soporte.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de manejar interacciones de servicio, resolviendo conflictos y entendiendo necesidades.",
// "Objetivo general": "Equipar con técnicas efectivas para manejo de clientes.",
// "Objetivos específicos": "Reconocer principios de servicio al cliente.\nExplorar manejo de interacciones.\nEvaluar resolución de conflictos éticamente.\n",
// "Contenidos": "Principios de servicio\n\nManejo de interacciones\n\nResolución de conflictos\n\nMejora continua\n\nMejores prácticas",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "15 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Data-Centre-Professional-CDCP.jpg",
// "Certificaciones": "Certified Data Centre Professional (CDCP)",
// "Área": "GESTIÓN DE DATA CENTERS",
// "Ente Certificador": "GAQM / EPI",
// "Dirigido a / Perfil de entrada": "Profesionales en infraestructura de data centers.\nGerentes de operaciones IT.\nEstudiantes en gestión de centros de datos.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de entender componentes clave de data centers y su gestión.",
// "Objetivo general": "Proporcionar conocimiento sobre infraestructura crítica en data centers.",
// "Objetivos específicos": "Reconocer componentes de data centers.\nExplorar diseño y operaciones.\nEvaluar mantenimiento ético y responsable.\n",
// "Contenidos": "Componentes de data centers\n\nDiseño y construcción\n\nMantenimiento y operaciones\n\nSeguridad y cumplimiento\n\nEficiencia energética",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-General-Manager-CGM.webp",
// "Certificaciones": "Certified General Manager (CGM)",
// "Área": "GESTIÓN GENERAL",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Gerentes medios en diversas industrias.\nProfesionales buscando mejorar liderazgo.\nEstudiantes en gestión.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de motivar equipos, gestionar proyectos y analizar situaciones financieras.",
// "Objetivo general": "Mejorar efectividad y liderazgo en gestión general.",
// "Objetivos específicos": "Reconocer enfoques sistemáticos para objetivos.\nExplorar motivación y construcción de equipos.\nEvaluar análisis financieros y riesgos.\n",
// "Contenidos": "Gestión estratégica\n\nMotivación de equipos\n\nGestión de proyectos\n\nAnálisis financiero\n\nEvaluación de riesgos",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Sports-Manager-CSM.jpg",
// "Certificaciones": "Certified Sports Manager (CSM)",
// "Área": "GESTIÓN DEPORTIVA",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en gestión deportiva.\nGerentes de clubes y escuelas deportivas.\nEstudiantes en administración deportiva.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de gestionar operaciones deportivas en instituciones.",
// "Objetivo general": "Desarrollar competencias para gestión en el sector deportivo.",
// "Objetivos específicos": "Reconocer principios de gestión deportiva.\nExplorar operaciones en clubes y escuelas.\nEvaluar estrategias éticas en deportes.\n",
// "Contenidos": "Principios de gestión deportiva\n\nOperaciones en instituciones\n\nMarketing deportivo\n\nFinanzas en deportes\n\nLiderazgo en equipos",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Become-a-Certified-Human-Resource-Manager.webp",
// "Certificaciones": "Certified Human Resources Manager (CHRM)",
// "Área": "GESTIÓN DE RECURSOS HUMANOS",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en RRHH.\nGerentes que manejan talento.\nEstudiantes en recursos humanos.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de realizar funciones de RRHH, desde reclutamiento hasta desarrollo.",
// "Objetivo general": "Equipar con habilidades para funciones de recursos humanos.",
// "Objetivos específicos": "Reconocer procesos de reclutamiento.\nExplorar desarrollo de talento.\nEvaluar gestión ética de empleados.\n",
// "Contenidos": "Proceso de contratación\n\nGestión de talento\n\nDesarrollo organizacional\n\nRelaciones laborales\n\nEvaluación de desempeño",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Real-Estate-Manager-CREM.jpg",
// "Certificaciones": "Certified Real Estate Manager (CREM)",
// "Área": "GESTIÓN INMOBILIARIA",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en sector inmobiliario.\nGerentes de propiedades.\nEstudiantes en real estate.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de operar eficientemente en el sector inmobiliario.",
// "Objetivo general": "Equipar para operar en el sector inmobiliario.",
// "Objetivos específicos": "Reconocer estrategias inmobiliarias.\nExplorar gestión de propiedades.\nEvaluar operaciones éticas en real estate.\n",
// "Contenidos": "Estrategias inmobiliarias\n\nGestión de propiedades\n\nFinanzas en real estate\n\nMarketing inmobiliario\n\nAspectos legales",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/cyberiuminfotech-21032023125652Untitled design (79).jpg",
// "Certificaciones": "Certified Data Protection and Privacy Manager (CDPPM)",
// "Área": "PROTECCIÓN DE DATOS",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en seguridad de datos.\nGerentes de privacidad.\nEstudiantes en ciberseguridad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de proteger datos personales usando estándares internacionales.",
// "Objetivo general": "Enseñar a proteger datos y privacidad con estándares globales.",
// "Objetivos específicos": "Reconocer estándares de seguridad y privacidad.\nExplorar leyes de datos.\nEvaluar gestión ética de privacidad.\n",
// "Contenidos": "Estándares de seguridad\n\nLeyes de privacidad\n\nGestión de datos\n\nCumplimiento regulatorio\n\nAuditorías de privacidad",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Information-Technology-Manager-CITM.jpg",
// "Certificaciones": "Certified Information Technology Manager (CITM)",
// "Área": "GESTIÓN DE TI",
// "Ente Certificador": "GAQM / EPI",
// "Dirigido a / Perfil de entrada": "Profesionales senior en IT.\nLíderes de equipos IT.\nEstudiantes con experiencia en TI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de gestionar IT en niveles senior, incluyendo proyectos y personal.",
// "Objetivo general": "Enseñar competencias para especialistas IT en niveles senior.",
// "Objetivos específicos": "Reconocer marcos corporativos en IT.\nExplorar gestión de software y personal.\nEvaluar proyectos IT éticamente.\n",
// "Contenidos": "Marcos corporativos\n\nGestión de software\n\nGestión de personal\n\nProyectos IT\n\nServicios de gestión",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "24 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Risk-and-Crisis-Manager.jpg",
// "Certificaciones": "Certified Risk and Crisis Manager (CRCM)",
// "Área": "GESTIÓN DE RIESGOS Y CRISIS",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en gestión de riesgos.\nGerentes de crisis.\nEstudiantes en risk management.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de identificar riesgos y manejar crisis.",
// "Objetivo general": "Proporcionar herramientas para gestión de riesgos y crisis.",
// "Objetivos específicos": "Reconocer identificación de riesgos.\nExplorar respuesta a crisis.\nEvaluar estrategias éticas.\n",
// "Contenidos": "Identificación de riesgos\n\nManejo de crisis\n\nEstrategias de mitigación\n\nPlanificación de continuidad\n\nEvaluación post-crisis",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Lean-IT-Foundation.jpg",
// "Certificaciones": "Lean IT Foundation",
// "Área": "GESTIÓN LEAN EN TI",
// "Ente Certificador": "GAQM / PeopleCert",
// "Dirigido a / Perfil de entrada": "Profesionales en TI buscando eficiencia.\nGerentes de servicios IT.\nEstudiantes en lean management.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de apoyar estrategias lean en organizaciones IT.",
// "Objetivo general": "Proporcionar conocimientos básicos para estrategias lean en TI.",
// "Objetivos específicos": "Reconocer principios lean en TI.\nExplorar eliminación de desperdicios.\nEvaluar valor para el cliente.\n",
// "Contenidos": "Principios lean\n\nValor para el cliente\n\nEliminación de desperdicios\n\nMejora continua\n\nAplicación en TI",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Change-Manager-–-Foundation-CCMF.jpg",
// "Certificaciones": "Certified Quality Manager (CQM)",
// "Área": "GESTIÓN DE CALIDAD",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en calidad.\nGerentes de calidad.\nEstudiantes en gestión de calidad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de motivar staff y gestionar proyectos de calidad.",
// "Objetivo general": "Mejorar habilidades en gestión de calidad.",
// "Objetivos específicos": "Reconocer sistemas de calidad.\nExplorar análisis financieros en calidad.\nEvaluar mejora continua ética.\n",
// "Contenidos": "Sistemas de calidad\n\nLiderazgo en calidad\n\nAnálisis financiero\n\nGestión de proyectos\n\nMejora continua",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Finance-Manager-CFM.jpg",
// "Certificaciones": "Certified Finance Manager (CFM)",
// "Área": "GESTIÓN FINANCIERA",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en finanzas.\nGerentes financieros.\nEstudiantes en finanzas.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de planificar y optimizar rendimiento financiero.",
// "Objetivo general": "Mejorar capacidades en gestión financiera.",
// "Objetivos específicos": "Reconocer planificación financiera.\nExplorar control financiero.\nEvaluar optimización ética.\n",
// "Contenidos": "Planificación financiera\n\nControl y optimización\n\nAnálisis de rendimiento\n\nGestión de riesgos\n\nEstrategias sostenibles",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/cpam.jpg",
// "Certificaciones": "Certified Professional Accountant Manager (CPAM)",
// "Área": "CONTABILIDAD Y GESTIÓN",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Contadores y gerentes financieros.\nProfesionales en servicios financieros.\nEstudiantes en contabilidad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de manejar finanzas y contabilidad en roles gerenciales.",
// "Objetivo general": "Validar habilidades en contabilidad gerencial.",
// "Objetivos específicos": "Reconocer principios contables.\nExplorar gestión financiera.\nEvaluar cumplimiento ético.\n",
// "Contenidos": "Principios contables\n\nGestión financiera\n\nAuditoría\n\nImpuestos\n\nInformes financieros",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "Intentos ilimitados",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Global-Tax-Practitioner-CGTP.jpg",
// "Certificaciones": "Certified Global Tax Practitioner (CGTP)",
// "Área": "IMPUESTOS GLOBALES",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en impuestos.\nContadores y abogados fiscales.\nEstudiantes en tax management.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de manejar impuestos globales y tratados internacionales.",
// "Objetivo general": "Proporcionar conocimientos en impuestos internacionales.",
// "Objetivos específicos": "Reconocer políticas fiscales globales.\nExplorar tratados de doble tributación.\nEvaluar cumplimiento ético en taxes.\n",
// "Contenidos": "Políticas fiscales internacionales\n\nTratados de doble tributación\n\nPrecios de transferencia\n\nCumplimiento regulatorio\n\nPlanificación fiscal",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Sales-Marketing-Professional-Course-CSMP.jpg",
// "Certificaciones": "Certified Sales and Marketing Professional (CSMP)",
// "Área": "VENTAS Y MARKETING",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en ventas y marketing.\nGerentes de marketing.\nEstudiantes en business.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar estrategias de ventas y marketing de bajo costo.",
// "Objetivo general": "Enseñar estrategias efectivas de ventas y marketing.",
// "Objetivos específicos": "Reconocer exposición máxima a bajo costo.\nExplorar estrategias de ventas.\nEvaluar marketing ético.\n",
// "Contenidos": "Estrategias de marketing\n\nTécnicas de ventas\n\nExposición a bajo costo\n\nAnálisis de mercado\n\nMejora de ventas",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "8 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/177d4a046ee40.png",
// "Certificaciones": "Certified Digital Marketing Professional (CDMP)",
// "Área": "MARKETING DIGITAL",
// "Ente Certificador": "GAQM / DMI",
// "Dirigido a / Perfil de entrada": "Profesionales en marketing digital.\nGerentes de campañas digitales.\nEstudiantes en digital marketing.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar estrategias digitales, incluyendo SEO y social media.",
// "Objetivo general": "Proporcionar habilidades en disciplinas clave de marketing digital.",
// "Objetivos específicos": "Reconocer AI en marketing.\nExplorar SEO y PPC.\nEvaluar content marketing ético.\n",
// "Contenidos": "Estrategias digitales\n\nSEO y PPC\n\nSocial media\n\nContent marketing\n\nAnálisis digital",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "30 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/LPI_Logo-_Colour-1024x449.jpg",
// "Certificaciones": "Linux Certified Professional (LCP)",
// "Área": "SISTEMAS LINUX",
// "Ente Certificador": "GAQM / LPI",
// "Dirigido a / Perfil de entrada": "Desarrolladores y administradores Linux.\nProfesionales en sistemas open source.\nEstudiantes en Linux.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de capitalizar oportunidades en Linux.",
// "Objetivo general": "Validar conocimientos en administración de Linux.",
// "Objetivos específicos": "Reconocer arquitectura Linux.\nExplorar instalación y distribuciones.\nEvaluar uso ético de Linux.\n",
// "Contenidos": "Arquitectura Linux\n\nInstalación y distribuciones\n\nAdministración de sistemas\n\nSeguridad\n\nScripting",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/1_FrEzRbciYFMQXLLyg6k-cg.jpg",
// "Certificaciones": "Certified User Experience (UX) Designer (CUED)",
// "Área": "DISEÑO UX",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en diseño UX.\nDiseñadores de apps y websites.\nEstudiantes en user experience.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de crear interacciones efectivas en productos digitales.",
// "Objetivo general": "Enseñar sobre interacciones de usuarios con productos.",
// "Objetivos específicos": "Reconocer principios de UX.\nExplorar diseño de interfaces.\nEvaluar usabilidad ética.\n",
// "Contenidos": "Principios de UX\n\nDiseño de interfaces\n\nUsabilidad\n\nInvestigación de usuarios\n\nPrototipado",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/iso-20000.png",
// "Certificaciones": "ISO 20000 - ITSM Certificate",
// "Área": "GESTIÓN DE SERVICIOS TI",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Profesionales en ITSM.\nGerentes de servicios TI.\nEstudiantes en gestión de TI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de entender conceptos básicos de ITSM según ISO 20000.",
// "Objetivo general": "Introducir principios de gestión de servicios TI.",
// "Objetivos específicos": "Reconocer requisitos de ISO 20000.\nExplorar procesos de ITSM.\nEvaluar implementación ética.\n",
// "Contenidos": "Requisitos de ISO 20000\n\nProcesos de ITSM\n\nMejora de servicios\n\nAuditoría interna\n\nCertificación",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00198.png",
// "Certificaciones": "ISO 27001:2022 ISMS - Certified Internal Auditor",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores internos en ISMS.\nProfesionales en seguridad de información.\nEstudiantes en auditoría.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de realizar auditorías internas según ISO 27001:2022.",
// "Objetivo general": "Entrenar en auditorías internas para ISMS.",
// "Objetivos específicos": "Reconocer estándares de auditoría.\nExplorar planificación de auditorías.\nEvaluar conformidad ética.\n",
// "Contenidos": "Principios de auditoría\n\nPlanificación de auditorías\n\nEjecución de auditorías\n\nReportes\n\nSeguimiento",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "24 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/iso-27001-auditor-1024x576.jpg",
// "Certificaciones": "ISO 27001 : 2013 - Certified Lead Auditor",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en ISMS.\nProfesionales con experiencia en seguridad.\nEstudiantes avanzados en auditoría.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de ISMS según ISO 27001:2013.",
// "Objetivo general": "Preparar para liderar auditorías de certificación ISMS.",
// "Objetivos específicos": "Reconocer normas de auditoría.\nExplorar gestión de programas de auditoría.\nEvaluar competencia de auditores.\n",
// "Contenidos": "Normas de auditoría\n\nGestión de programas\n\nAuditorías de certificación\n\nCompetencia de auditores\n\nEvaluación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00324.png",
// "Certificaciones": "ISO/IEC 38500 - Lead IT Corporate Governance Manager",
// "Área": "GOBERNANZA TI",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Gerentes de gobernanza TI.\nProfesionales en IT corporate governance.\nEstudiantes en gestión TI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de gestionar gobernanza corporativa en TI según ISO/IEC 38500.",
// "Objetivo general": "Enseñar gobernanza efectiva de TI.",
// "Objetivos específicos": "Reconocer principios de gobernanza TI.\nExplorar evaluación y dirección.\nEvaluar monitoreo ético.\n",
// "Contenidos": "Principios de gobernanza TI\n\nEvaluación de rendimiento\n\nDirección estratégica\n\nMonitoreo\n\nCumplimiento",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00165.png",
// "Certificaciones": "ISO 22301 BCMS - Certified Lead Auditor",
// "Área": "CONTINUIDAD DEL NEGOCIO",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en continuidad del negocio.\nProfesionales en BCMS.\nEstudiantes en auditoría de continuidad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de BCMS según ISO 22301.",
// "Objetivo general": "Preparar para auditorías de sistemas de continuidad del negocio.",
// "Objetivos específicos": "Reconocer estándares de BCMS.\nExplorar planificación de auditorías.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de continuidad\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_9795.png",
// "Certificaciones": "ISO 50001 : 2018 - Certified Lead Auditor",
// "Área": "GESTIÓN DE ENERGÍA",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en gestión de energía.\nProfesionales en EnMS.\nEstudiantes en auditoría energética.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de EnMS según ISO 50001:2018.",
// "Objetivo general": "Entrenar en auditorías para sistemas de gestión de energía.",
// "Objetivos específicos": "Reconocer requisitos de ISO 50001.\nExplorar auditorías energéticas.\nEvaluar eficiencia ética.\n",
// "Contenidos": "Requisitos de EnMS\n\nAuditorías energéticas\n\nPlanificación\n\nEjecución\n\nCertificación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_6848.png",
// "Certificaciones": "ISO 9001 : 2015 - Certified Internal Auditor",
// "Área": "GESTIÓN DE CALIDAD",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores internos en QMS.\nProfesionales en calidad.\nEstudiantes en auditoría de calidad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de realizar auditorías internas según ISO 9001:2015.",
// "Objetivo general": "Entrenar en auditorías internas para QMS.",
// "Objetivos específicos": "Reconocer principios de auditoría.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Principios de auditoría\n\nPlanificación\n\nEjecución\n\nReportes\n\nSeguimiento",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "24 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00372.png",
// "Certificaciones": "ISO 9001 Lead Implementer",
// "Área": "GESTIÓN DE CALIDAD",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Implementadores de QMS.\nGerentes de calidad.\nEstudiantes en implementación de estándares.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar QMS según ISO 9001.",
// "Objetivo general": "Enseñar implementación de sistemas de gestión de calidad.",
// "Objetivos específicos": "Reconocer requisitos de ISO 9001.\nExplorar planificación de implementación.\nEvaluar monitoreo ético.\n",
// "Contenidos": "Requisitos de QMS\n\nPlanificación\n\nImplementación\n\nMonitoreo\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_9700.png",
// "Certificaciones": "ISO 9001 : 2018 - Certified Lead Auditor",
// "Área": "GESTIÓN DE CALIDAD",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en QMS.\nProfesionales con experiencia en calidad.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de QMS según ISO 9001:2018.",
// "Objetivo general": "Preparar para liderar auditorías de certificación QMS.",
// "Objetivos específicos": "Reconocer normas de auditoría.\nExplorar gestión de programas.\nEvaluar competencia.\n",
// "Contenidos": "Normas de auditoría\n\nGestión de programas\n\nAuditorías de certificación\n\nCompetencia\n\nEvaluación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/ISO-20000.webp",
// "Certificaciones": "ISO / IEC 20000 ITSM - Foundation Certificate",
// "Área": "GESTIÓN DE SERVICIOS TI",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Profesionales principiantes en ITSM.\nInteresados en servicios TI.\nEstudiantes en TI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de entender conceptos básicos de ITSM según ISO/IEC 20000.",
// "Objetivo general": "Introducir fundamentos de gestión de servicios TI.",
// "Objetivos específicos": "Reconocer terminología de ITSM.\nExplorar estructura de ISO 20000.\nEvaluar conceptos básicos.\n",
// "Contenidos": "Terminología ITSM\n\nEstructura de ISO 20000\n\nConceptos básicos\n\nProcesos\n\nCertificación",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00206.png",
// "Certificaciones": "ISO / IEC 27002 Foundation",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Profesionales principiantes en seguridad de información.\nInteresados en controles de seguridad.\nEstudiantes en ciberseguridad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de entender controles de seguridad según ISO/IEC 27002.",
// "Objetivo general": "Introducir fundamentos de controles de seguridad de información.",
// "Objetivos específicos": "Reconocer controles de seguridad.\nExplorar implementación.\nEvaluar aplicación ética.\n",
// "Contenidos": "Controles de seguridad\n\nImplementación\n\nMejores prácticas\n\nCumplimiento\n\nAuditoría",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_5449.png",
// "Certificaciones": "ISO/IEC 27001:2022 - Certified Lead Implementer",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Implementadores de ISMS.\nGerentes de seguridad.\nEstudiantes en implementación.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar ISMS según ISO/IEC 27001:2022.",
// "Objetivo general": "Enseñar implementación de sistemas de gestión de seguridad de información.",
// "Objetivos específicos": "Reconocer requisitos de ISO 27001.\nExplorar planificación.\nEvaluar monitoreo.\n",
// "Contenidos": "Requisitos de ISMS\n\nPlanificación\n\nImplementación\n\nMonitoreo\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/iso-27001-auditor-firebrand.png",
// "Certificaciones": "ISO/IEC 27001-27002 - Lead Auditor",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en ISMS.\nProfesionales experimentados.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar ISMS según ISO/IEC 27001 y 27002.",
// "Objetivo general": "Preparar para auditorías combinadas de ISMS y controles.",
// "Objetivos específicos": "Reconocer integración de estándares.\nExplorar auditorías combinadas.\nEvaluar controles.\n",
// "Contenidos": "Integración 27001 y 27002\n\nAuditorías combinadas\n\nControles de seguridad\n\nReportes\n\nCertificación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_194.png",
// "Certificaciones": "ISO 9001 : 2015 - Certified Lead Auditor",
// "Área": "GESTIÓN DE CALIDAD",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en QMS.\nProfesionales con experiencia.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de QMS según ISO 9001:2015.",
// "Objetivo general": "Preparar para liderar auditorías de calidad.",
// "Objetivos específicos": "Reconocer normas de auditoría.\nExplorar gestión de programas.\nEvaluar competencia.\n",
// "Contenidos": "Normas de auditoría\n\nGestión de programas\n\nAuditorías de certificación\n\nCompetencia\n\nEvaluación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_5157.png",
// "Certificaciones": "ISO/IEC 27001:2022 - Certified Lead Auditor",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en ISMS.\nProfesionales experimentados.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de ISMS según ISO/IEC 27001:2022.",
// "Objetivo general": "Preparar para auditorías de certificación ISMS actualizadas.",
// "Objetivos específicos": "Reconocer actualizaciones de ISO 27001:2022.\nExplorar gestión de auditorías.\nEvaluar controles.\n",
// "Contenidos": "Actualizaciones de ISO 27001\n\nGestión de auditorías\n\nControles de seguridad\n\nReportes\n\nCertificación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_7450.png",
// "Certificaciones": "ISO 27001 : 2013 ISMS - Foundation",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Profesionales principiantes en ISMS.\nInteresados en seguridad de información.\nEstudiantes en TI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de entender conceptos básicos de ISMS según ISO 27001:2013.",
// "Objetivo general": "Introducir fundamentos de gestión de seguridad de información.",
// "Objetivos específicos": "Reconocer terminología de ISMS.\nExplorar estructura de ISO 27001.\nEvaluar conceptos básicos.\n",
// "Contenidos": "Terminología ISMS\n\nEstructura de ISO 27001\n\nConceptos básicos\n\nControles\n\nCertificación",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_7291.png",
// "Certificaciones": "ISO/IEC 27031:2011 - Lead Implementer",
// "Área": "CONTINUIDAD TI",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Implementadores de continuidad TI.\nGerentes de TI.\nEstudiantes en continuidad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar continuidad TI según ISO/IEC 27031:2011.",
// "Objetivo general": "Enseñar implementación de continuidad en TI.",
// "Objetivos específicos": "Reconocer requisitos de continuidad TI.\nExplorar planificación.\nEvaluar monitoreo.\n",
// "Contenidos": "Requisitos de continuidad TI\n\nPlanificación\n\nImplementación\n\nMonitoreo\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_473.jpg",
// "Certificaciones": "ISO 14001 - Certified Lead Auditor",
// "Área": "GESTIÓN AMBIENTAL",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en EMS.\nProfesionales en medio ambiente.\nEstudiantes en auditoría ambiental.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de EMS según ISO 14001.",
// "Objetivo general": "Preparar para auditorías de sistemas de gestión ambiental.",
// "Objetivos específicos": "Reconocer estándares ambientales.\nExplorar planificación de auditorías.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares ambientales\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/twitter_thumb_201604_00287.png",
// "Certificaciones": "ISO 31000 - Certified Lead Risk Manager",
// "Área": "GESTIÓN DE RIESGOS",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Gerentes de riesgos.\nProfesionales en risk management.\nEstudiantes en gestión de riesgos.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de gestionar riesgos según ISO 31000.",
// "Objetivo general": "Enseñar gestión de riesgos empresariales.",
// "Objetivos específicos": "Reconocer principios de riesgos.\nExplorar evaluación.\nEvaluar tratamiento ético.\n",
// "Contenidos": "Principios de riesgos\n\nEvaluación\n\nTratamiento\n\nMonitoreo\n\nComunicación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_9202.png",
// "Certificaciones": "ISO/IEC 20000-1:2018 - Certified Lead Auditor",
// "Área": "GESTIÓN DE SERVICIOS TI",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en ITSM.\nProfesionales en servicios TI.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de ITSM según ISO/IEC 20000-1:2018.",
// "Objetivo general": "Preparar para auditorías de gestión de servicios TI.",
// "Objetivos específicos": "Reconocer requisitos de ISO 20000.\nExplorar auditorías de servicios.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ITSM\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nCertificación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_6751.png",
// "Certificaciones": "ISO/IEC 27701 - Certified Lead Auditor",
// "Área": "GESTIÓN DE PRIVACIDAD",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en PIMS.\nProfesionales en privacidad.\nEstudiantes en auditoría de datos.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar PIMS según ISO/IEC 27701.",
// "Objetivo general": "Entrenar en auditorías de gestión de información de privacidad.",
// "Objetivos específicos": "Reconocer estándares de privacidad.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de PIMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_9514.jpg",
// "Certificaciones": "ISO 26262 - Certified Internal Auditor",
// "Área": "SEGURIDAD FUNCIONAL AUTOMOTRIZ",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores internos en automotriz.\nProfesionales en seguridad funcional.\nEstudiantes en auditoría automotriz.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de realizar auditorías internas según ISO 26262.",
// "Objetivo general": "Entrenar en auditorías para seguridad funcional en automóviles.",
// "Objetivos específicos": "Reconocer estándares de seguridad funcional.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de ISO 26262\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nSeguimiento",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "24 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/iso10.jpg",
// "Certificaciones": "ISO 37001:2016 - Certified Lead Auditor",
// "Área": "ANTI-SOBORNO",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en ABMS.\nProfesionales en anti-corrupción.\nEstudiantes en auditoría anti-soborno.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de ABMS según ISO 37001:2016.",
// "Objetivo general": "Preparar para auditorías de sistemas anti-soborno.",
// "Objetivos específicos": "Reconocer requisitos de anti-soborno.\nExplorar planificación de auditorías.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ABMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00217.png",
// "Certificaciones": "ISO/IEC 27032 - Lead Cyber Security Manager",
// "Área": "CIBERSEGURIDAD",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Gerentes de ciberseguridad.\nProfesionales en cyber security.\nEstudiantes en gestión de ciberseguridad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de gestionar ciberseguridad según ISO/IEC 27032.",
// "Objetivo general": "Enseñar gestión de ciberseguridad.",
// "Objetivos específicos": "Reconocer principios de cyber security.\nExplorar controles.\nEvaluar respuesta a incidentes.\n",
// "Contenidos": "Principios de ciberseguridad\n\nControles\n\nRespuesta a incidentes\n\nMonitoreo\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_6693.png",
// "Certificaciones": "ISO 45001:2018 OHSMS - Certified Lead Auditor",
// "Área": "SALUD Y SEGURIDAD OCUPACIONAL",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en OHSMS.\nProfesionales en salud ocupacional.\nEstudiantes en auditoría OHS.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de OHSMS según ISO 45001:2018.",
// "Objetivo general": "Preparar para auditorías de sistemas de salud y seguridad ocupacional.",
// "Objetivos específicos": "Reconocer requisitos de OHSMS.\nExplorar planificación de auditorías.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de OHSMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_1331.png",
// "Certificaciones": "ISO 22000:2018 - Certified Lead Auditor",
// "Área": "GESTIÓN DE SEGURIDAD ALIMENTARIA",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en FSMS.\nProfesionales en seguridad alimentaria.\nEstudiantes en auditoría alimentaria.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de FSMS según ISO 22000:2018.",
// "Objetivo general": "Preparar para auditorías de sistemas de gestión de seguridad alimentaria.",
// "Objetivos específicos": "Reconocer requisitos de FSMS.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de FSMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_7061.png",
// "Certificaciones": "ISO 13485:2016 - Certified Lead Auditor",
// "Área": "GESTIÓN DE DISPOSITIVOS MÉDICOS",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en MDMS.\nProfesionales en dispositivos médicos.\nEstudiantes en auditoría médica.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de MDMS según ISO 13485:2016.",
// "Objetivo general": "Preparar para auditorías de sistemas de gestión de dispositivos médicos.",
// "Objetivos específicos": "Reconocer requisitos de MDMS.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de MDMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_1950.png",
// "Certificaciones": "ISO 27019:2017 - Certified Lead Auditor",
// "Área": "SEGURIDAD EN ENERGÍA",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en seguridad de energía.\nProfesionales en utilities.\nEstudiantes en auditoría de energía.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar seguridad en sistemas de energía según ISO 27019:2017.",
// "Objetivo general": "Entrenar en auditorías para seguridad en sector energético.",
// "Objetivos específicos": "Reconocer controles para energía.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Controles para energía\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_5069.png",
// "Certificaciones": "ISO 41001:2018 - Certified Lead Auditor",
// "Área": "GESTIÓN DE INSTALACIONES",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en FM.\nGerentes de instalaciones.\nEstudiantes en auditoría de facilities.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de FMS según ISO 41001:2018.",
// "Objetivo general": "Preparar para auditorías de sistemas de gestión de instalaciones.",
// "Objetivos específicos": "Reconocer requisitos de FM.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de FMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_3193.jpg",
// "Certificaciones": "ISO 21500 - Certified Lead Project Manager",
// "Área": "GESTIÓN DE PROYECTOS",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Gerentes de proyectos líderes.\nProfesionales en project management.\nEstudiantes en gestión de proyectos.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar proyectos según ISO 21500.",
// "Objetivo general": "Enseñar gestión de proyectos según estándares internacionales.",
// "Objetivos específicos": "Reconocer principios de proyectos.\nExplorar planificación.\nEvaluar ejecución ética.\n",
// "Contenidos": "Principios de proyectos\n\nPlanificación\n\nEjecución\n\nControl\n\nCierre",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_630.png",
// "Certificaciones": "ISO/IEC 19770 - Certified Lead Auditor",
// "Área": "GESTIÓN DE ACTIVOS DE SOFTWARE",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en SAM.\nProfesionales en activos de software.\nEstudiantes en auditoría IT.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar SAM según ISO/IEC 19770.",
// "Objetivo general": "Entrenar en auditorías para gestión de activos de software.",
// "Objetivos específicos": "Reconocer estándares de SAM.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de SAM\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_5983.png",
// "Certificaciones": "ISO/IEC 17025 - Certified Lead Auditor",
// "Área": "GESTIÓN DE LABORATORIOS",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en laboratorios.\nProfesionales en acreditación.\nEstudiantes en auditoría de labs.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de laboratorios según ISO/IEC 17025.",
// "Objetivo general": "Preparar para auditorías de competencia de laboratorios.",
// "Objetivos específicos": "Reconocer requisitos de labs.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ISO 17025\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nAcreditación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_4629.png",
// "Certificaciones": "ISO/IEC 27017:2015 - Certified Lead Auditor",
// "Área": "SEGURIDAD EN LA NUBE",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en cloud security.\nProfesionales en servicios en nube.\nEstudiantes en auditoría cloud.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar seguridad en nube según ISO/IEC 27017:2015.",
// "Objetivo general": "Entrenar en auditorías para seguridad en servicios cloud.",
// "Objetivos específicos": "Reconocer controles para nube.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Controles para nube\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_1607.png",
// "Certificaciones": "ISO/IEC 17020:2012 - Certified Lead Auditor",
// "Área": "INSPECCIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en cuerpos de inspección.\nProfesionales en inspección.\nEstudiantes en auditoría de inspección.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar cuerpos de inspección según ISO/IEC 17020:2012.",
// "Objetivo general": "Preparar para auditorías de organismos de inspección.",
// "Objetivos específicos": "Reconocer requisitos de inspección.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ISO 17020\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nAcreditación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_1801.png",
// "Certificaciones": "ISO 37301 - Certified Lead Auditor",
// "Área": "GESTIÓN DE CUMPLIMIENTO",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en CMS.\nProfesionales en cumplimiento.\nEstudiantes en auditoría de cumplimiento.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar CMS según ISO 37301.",
// "Objetivo general": "Entrenar en auditorías para sistemas de gestión de cumplimiento.",
// "Objetivos específicos": "Reconocer estándares de cumplimiento.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de CMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_9639.png",
// "Certificaciones": "ISO 26000 - Certified Lead Auditor",
// "Área": "RESPONSABILIDAD SOCIAL",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en responsabilidad social.\nProfesionales en CSR.\nEstudiantes en auditoría social.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar responsabilidad social según ISO 26000.",
// "Objetivo general": "Preparar para auditorías de responsabilidad social.",
// "Objetivos específicos": "Reconocer principios de CSR.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Principios de ISO 26000\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00256.png",
// "Certificaciones": "ISO 28000 - Certified Lead Auditor",
// "Área": "GESTIÓN DE CADENA DE SUMINISTRO",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en SCM.\nProfesionales en cadena de suministro.\nEstudiantes en auditoría de supply chain.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar SCM según ISO 28000.",
// "Objetivo general": "Entrenar en auditorías para gestión de cadena de suministro.",
// "Objetivos específicos": "Reconocer estándares de SCM.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de ISO 28000\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_6254.png",
// "Certificaciones": "ISO 21434:2021 - Certified Lead Auditor",
// "Área": "CIBERSEGURIDAD AUTOMOTRIZ",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en ciberseguridad automotriz.\nProfesionales en vehículos conectados.\nEstudiantes en auditoría automotriz.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar ciberseguridad automotriz según ISO 21434:2021.",
// "Objetivo general": "Preparar para auditorías de ciberseguridad en vehículos.",
// "Objetivos específicos": "Reconocer estándares de ciberseguridad automotriz.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de ISO 21434\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00362.png",
// "Certificaciones": "ISO 55001 - Certified Lead Auditor",
// "Área": "GESTIÓN DE ACTIVOS",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en AMS.\nProfesionales en gestión de activos.\nEstudiantes en auditoría de activos.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar AMS según ISO 55001.",
// "Objetivo general": "Entrenar en auditorías para sistemas de gestión de activos.",
// "Objetivos específicos": "Reconocer requisitos de AMS.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ISO 55001\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_1091.png",
// "Certificaciones": "ISO 19011 - Certified Lead Auditor",
// "Área": "AUDITORÍA DE SISTEMAS DE GESTIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en sistemas de gestión.\nProfesionales en auditoría general.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías según ISO 19011.",
// "Objetivo general": "Preparar para auditorías de sistemas de gestión.",
// "Objetivos específicos": "Reconocer principios de auditoría.\nExplorar programas de auditoría.\nEvaluar competencia.\n",
// "Contenidos": "Principios de auditoría\n\nProgramas de auditoría\n\nEjecución\n\nCompetencia\n\nEvaluación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_3691.png",
// "Certificaciones": "ISO/IEC 27000 - Certified Lead Auditor",
// "Área": "SEGURIDAD DE LA INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en familia 27000.\nProfesionales en seguridad.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar según familia ISO/IEC 27000.",
// "Objetivo general": "Entrenar en auditorías para familia de estándares de seguridad.",
// "Objetivos específicos": "Reconocer familia 27000.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Familia ISO 27000\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00261.png",
// "Certificaciones": "ISO/TS 29001 - Certified Lead Auditor",
// "Área": "GESTIÓN DE CALIDAD EN PETRÓLEO",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en industria petrolera.\nProfesionales en QMS para petróleo.\nEstudiantes en auditoría petrolera.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar QMS en petróleo según ISO/TS 29001.",
// "Objetivo general": "Preparar para auditorías en sector petrolero.",
// "Objetivos específicos": "Reconocer requisitos para petróleo.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ISO/TS 29001\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/twitter_thumb_201604_00211.png",
// "Certificaciones": "ISO/IEC 27005 - Certified Lead Risk Manager",
// "Área": "GESTIÓN DE RIESGOS EN INFORMACIÓN",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Gerentes de riesgos en información.\nProfesionales en security risk.\nEstudiantes en risk management TI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de gestionar riesgos en información según ISO/IEC 27005.",
// "Objetivo general": "Enseñar gestión de riesgos en seguridad de información.",
// "Objetivos específicos": "Reconocer procesos de riesgos.\nExplorar evaluación.\nEvaluar tratamiento.\n",
// "Contenidos": "Procesos de riesgos\n\nEvaluación\n\nTratamiento\n\nMonitoreo\n\nComunicación",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/blob.png",
// "Certificaciones": "ISO/IEC 42001 - Certified Lead Implementer",
// "Área": "GESTIÓN DE INTELIGENCIA ARTIFICIAL",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Implementadores de AIMS.\nProfesionales en AI.\nEstudiantes en gestión de AI.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar AIMS según ISO/IEC 42001.",
// "Objetivo general": "Enseñar implementación de sistemas de gestión de IA.",
// "Objetivos específicos": "Reconocer requisitos de AIMS.\nExplorar planificación.\nEvaluar monitoreo.\n",
// "Contenidos": "Requisitos de ISO 42001\n\nPlanificación\n\nImplementación\n\nMonitoreo\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/blob (1).png",
// "Certificaciones": "ISO/IEC 42001 - Certified Lead Auditor",
// "Área": "GESTIÓN DE INTELIGENCIA ARTIFICIAL",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores líderes en AIMS.\nProfesionales en AI audit.\nEstudiantes avanzados.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de liderar auditorías de AIMS según ISO/IEC 42001.",
// "Objetivo general": "Preparar para auditorías de sistemas de gestión de IA.",
// "Objetivos específicos": "Reconocer estándares de AI.\nExplorar planificación de auditorías.\nEvaluar conformidad.\n",
// "Contenidos": "Estándares de AIMS\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/00310.png",
// "Certificaciones": "ISO 37101 - Certified Lead Auditor",
// "Área": "GESTIÓN DE COMUNIDADES SOSTENIBLES",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en sostenibilidad comunitaria.\nProfesionales en desarrollo sostenible.\nEstudiantes en auditoría sostenible.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar comunidades sostenibles según ISO 37101.",
// "Objetivo general": "Entrenar en auditorías para gestión de comunidades sostenibles.",
// "Objetivos específicos": "Reconocer requisitos de sostenibilidad.\nExplorar planificación.\nEvaluar conformidad.\n",
// "Contenidos": "Requisitos de ISO 37101\n\nPlanificación de auditorías\n\nEjecución\n\nReportes\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/jwapm5fuf02hl3wffip3r0dyzr8a.avif",
// "Certificaciones": "ISO 22301:2019 BCMS - Certified Lead Implementer",
// "Área": "CONTINUIDAD DEL NEGOCIO",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Implementadores de BCMS.\nGerentes de continuidad.\nEstudiantes en implementación de continuidad.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de implementar BCMS según ISO 22301:2019.",
// "Objetivo general": "Enseñar implementación de sistemas de continuidad del negocio.",
// "Objetivos específicos": "Reconocer requisitos de BCMS.\nExplorar planificación.\nEvaluar monitoreo.\n",
// "Contenidos": "Requisitos de ISO 22301\n\nPlanificación\n\nImplementación\n\nMonitoreo\n\nMejora",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "32 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_14.png",
// "Certificaciones": "IEC 62443 Cybersecurity Certificate",
// "Área": "CIBERSEGURIDAD INDUSTRIAL",
// "Ente Certificador": "ISA",
// "Dirigido a / Perfil de entrada": "Profesionales en IACS.\nIngenieros en ciberseguridad industrial.\nEstudiantes en seguridad OT.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de manejar ciberseguridad en sistemas de control industrial.",
// "Objetivo general": "Proporcionar conocimientos en ciberseguridad para IACS.",
// "Objetivos específicos": "Reconocer lifecycle de IACS.\nExplorar diseño y operaciones.\nEvaluar mantenimiento ético.\n",
// "Contenidos": "Lifecycle de IACS\n\nDiseño y implementación\n\nOperaciones\n\nMantenimiento\n\nEvaluación",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "16 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_1419.png",
// "Certificaciones": "ISO 14971:2019 - Certified Lead Auditor",
// "Área": "GESTIÓN DE RIESGOS MÉDICOS",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditores en riesgos médicos.\nProfesionales en dispositivos médicos.\nEstudiantes en auditoría médica.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de auditar riesgos en dispositivos médicos según ISO 14971:2019.",
// "Objetivo general": "Entrenar en auditorías para gestión de riesgos en dispositivos médicos.",
// "Objetivos específicos": "Reconocer procesos de riesgos médicos.\nExplorar evaluación.\nEvaluar tratamiento.\n",
// "Contenidos": "Procesos de riesgos\n\nEvaluación\n\nTratamiento\n\nMonitoreo\n\nReportes",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "40 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_240.png",
// "Certificaciones": "Certified AI Testing Professional (CAITP)",
// "Área": "PRUEBAS DE IA",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en testing de AI.\nTesters de sistemas inteligentes.\nEstudiantes en AI testing.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de probar sistemas de IA para funcionalidad y ética.",
// "Objetivo general": "Validar expertise en testing de AI.",
// "Objetivos específicos": "Reconocer evaluación de modelos AI.\nExplorar testing adversarial.\nEvaluar explainability ética.\n",
// "Contenidos": "Evaluación de modelos AI\n\nTesting adversarial\n\nExplainability\n\nCumplimiento\n\nÉtica en AI",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/generic-bscn-four-year.jpg",
// "Certificaciones": "Certified Nursing Assistant (CNA)",
// "Área": "ASISTENCIA EN ENFERMERÍA",
// "Ente Certificador": "GAQM / Estados locales",
// "Dirigido a / Perfil de entrada": "Personas interesadas en cuidado de salud.\nEstudiantes en enfermería.\nProfesionales principiantes en healthcare.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de proporcionar cuidado básico a pacientes en entornos de salud.",
// "Objetivo general": "Entrenar en rol vital de asistente de enfermería.",
// "Objetivos específicos": "Reconocer cuidado básico a pacientes.\nExplorar soporte a enfermeras.\nEvaluar ética en cuidado.\n",
// "Contenidos": "Cuidado básico\n\nSoporte médico\n\nÉtica en salud\n\nProcedimientos clínicos\n\nComunicación con pacientes",
// "Vigencia Certificación": "Varía por estado",
// "Cantidad de horas de capacitación": "75 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/Certified-Healthcare-Facility-Manager.jpg",
// "Certificaciones": "Certified Health Facility Manager (CHFM)",
// "Área": "GESTIÓN DE INSTALACIONES DE SALUD",
// "Ente Certificador": "GAQM / AHA",
// "Dirigido a / Perfil de entrada": "Gerentes de instalaciones de salud.\nProfesionales en healthcare facilities.\nEstudiantes en gestión de salud.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de manejar instalaciones de salud, incluyendo cumplimiento y mantenimiento.",
// "Objetivo general": "Demostrar maestría en dominios esenciales de gestión de facilities en salud.",
// "Objetivos específicos": "Reconocer cumplimiento y diseño.\nExplorar mantenimiento.\nEvaluar operaciones éticas.\n",
// "Contenidos": "Cumplimiento\n\nDiseño y construcción\n\nMantenimiento\n\nOperaciones\n\nSeguridad",
// "Vigencia Certificación": "3 años",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_7803.png",
// "Certificaciones": "Certified Web Developer (CWD)",
// "Área": "DESARROLLO WEB",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Desarrolladores web.\nProfesionales en programación web.\nEstudiantes en web development.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de crear aplicaciones web básicas con HTML, CSS y JavaScript.",
// "Objetivo general": "Validar competencias en desarrollo web básico.",
// "Objetivos específicos": "Reconocer HTML, CSS y JS.\nExplorar creación de apps web.\nEvaluar desarrollo ético.\n",
// "Contenidos": "HTML y CSS\n\nJavaScript\n\nAplicaciones web básicas\n\nDiseño responsive\n\nDebugging",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_9376.png",
// "Certificaciones": "Certified PHP Professional (CPP)",
// "Área": "PROGRAMACIÓN PHP",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Profesionales en PHP.\nDesarrolladores backend.\nEstudiantes en programación PHP.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de desarrollar software basado en PHP.",
// "Objetivo general": "Validar conocimientos en instalación, uso y sintaxis de PHP.",
// "Objetivos específicos": "Reconocer sintaxis de PHP.\nExplorar desarrollo de software.\nEvaluar semántica ética.\n",
// "Contenidos": "Instalación PHP\n\nSintaxis y semántica\n\nUso avanzado\n\nDesarrollo de apps\n\nSeguridad",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_6523.png",
// "Certificaciones": "Certified Associate Python Programmer (CAPP)",
// "Área": "PROGRAMACIÓN PYTHON",
// "Ente Certificador": "GAQM / Python Institute",
// "Dirigido a / Perfil de entrada": "Programadores principiantes en Python.\nProfesionales en desarrollo.\nEstudiantes en programación.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de realizar tareas de codificación a nivel intermedio en Python.",
// "Objetivo general": "Validar conocimientos en programación Python a nivel asociado.",
// "Objetivos específicos": "Reconocer sintaxis Python.\nExplorar tareas de codificación.\nEvaluar programación ética.\n",
// "Contenidos": "Sintaxis Python\n\nEstructuras de datos\n\nFunciones\n\nMódulos\n\nOOP básico",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// },
// {
// "course_image":"assets/courses/logo_4374.png",
// "Certificaciones": "Certified Professional Python Programmer (CPPP)",
// "Área": "PROGRAMACIÓN PYTHON AVANZADA",
// "Ente Certificador": "GAQM / Python Institute",
// "Dirigido a / Perfil de entrada": "Programadores avanzados en Python.\nProfesionales en software.\nEstudiantes avanzados en Python.\n",
// "Perfil de salida": "Al finalizar la certificación, el participante será capaz de realizar tareas avanzadas de programación en Python.",
// "Objetivo general": "Validar habilidades avanzadas en programación Python.",
// "Objetivos específicos": "Reconocer OOP avanzado.\nExplorar módulos avanzados.\nEvaluar técnicas éticas.\n",
// "Contenidos": "OOP avanzado\n\nMódulos y paquetes\n\nExcepciones\n\nMultithreading\n\nAplicaciones reales",
// "Vigencia Certificación": "No expira",
// "Cantidad de horas de capacitación": "20 horas",
// "Metodología (examen o proyecto)": "Examen",
// "Cantidad de intentos": "1 intento con posibilidad de repetición",
// "Modalidad": "Modalidad virtual en vivo"
// }


   
];

const COURSES_DATA_EN = [
{
"course_image":"assets/courses/microsoft-certified-azure-ai-fundamentals.jpg",
"Certificaciones": "Microsoft Azure AI Fundamentals ",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "People interested in learning about AI and related Azure services.\nSales professionals, project managers, and other non-technical roles who want to understand how AI can solve business problems.\nStudents and professionals seeking to start a career in artificial intelligence or data science.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to understand the basic concepts of artificial intelligence and its applications in Microsoft Azure, including services such as computer vision, natural language processing, and conversational agents, facilitating the design of basic intelligent solutions in the cloud.",
"Objetivo general": "Provide participants with a solid foundation on the fundamental principles of artificial intelligence and its practical implementation through Azure services, without requiring prior programming experience",
"Objetivos específicos": "Recognize key concepts of artificial intelligence, such as machine learning, computer vision, and NLP.\nExplore the AI services available in Microsoft Azure, understanding their functionality and use cases.\nEvaluate how to apply AI solutions in the cloud ethically and responsibly, considering social and technical implications.\n",
"Contenidos": "Describe AI workloads and considerations\n\nFundamental principles of machine learning (ML) on Azure\n\nComputer Vision capabilities on Azure\n\nNatural Language Processing (NLP) capabilities on Azure\n\nGenerative AI and Conversational Agents",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "15 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Designing and Implementing a Microsoft Azure AI Solution",
"course_image":"assets/courses/designing-implementing-an-azure-ai-solution.jpg",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Software engineers: Interested in integrating AI capabilities into applications using Azure services.\nAI solution developers: Seeking to design and deploy complete AI solutions in the Azure ecosystem.\nIT professionals: With development experience and an interest in specializing in applied artificial intelligence.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design, develop, and implement artificial intelligence solutions using Azure services, integrating vision, language, and decision models into scalable and secure applications.",
"Objetivo general": "Develop technical skills to create AI solutions in Microsoft Azure, using cognitive services, Azure Machine Learning, and development tools to solve business challenges through artificial intelligence.",
"Objetivos específicos": "Implement Azure cognitive services, such as computer vision, natural language processing, and speech recognition.\nDevelop and deploy machine learning models using Azure Machine Learning and automated workflows.\nIntegrate AI solutions into applications, ensuring compliance, ethics, and scalability in real environments.\n",
"Contenidos": "1. Plan and manage an Azure AI solution\n2. Implement generative AI solutions\n3. Implement an agency solution\n4. Implement computer vision solutions\n5. Implement natural language processing solutions\n6. Implement knowledge mining and information extraction solutions",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Azure Administrator ",
"course_image":"assets/courses/az-104t00_-microsoft_.jpg",
"Área": "Azure Infrastructure",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Azure administrators: Responsible for implementing, managing, and monitoring Azure environments.\nIT professionals: With experience in system and network administration who want to expand their skills in the cloud.\nConsultants and support technicians: Who work with Azure-based solutions and seek to formalize their knowledge.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to implement, manage, and monitor cloud environments in Microsoft Azure, efficiently and securely managing resources, networks, security, and storage services.",
"Objetivo general": "Develop the necessary competencies to manage cloud environments in Azure, ensuring availability, performance, and security of deployed resources.\n",
"Objetivos específicos": "Configure and manage compute, network, and storage services in Microsoft Azure.\nImplement security measures and access control, including identity management and resource monitoring.\nMonitor the performance and availability of cloud services, optimizing resources and resolving operational incidents.\n",
"Contenidos": "Manage Azure identities and governance\n\nImplement and manage storage\n\nImplement and manage Azure compute resources\n\nConfigure and manage virtual networks\n\nMonitor and maintain Azure resources",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Designing Microsoft Azure Infrastructure Solutions",
"course_image":"assets/courses/az-305-course-designing-microsoft-azure-infrastructure-solutions.jpg",
"Área": "Azure Infrastructure",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Cloud solution architects who want to design infrastructure solutions in Azure.\nIT professionals with Azure administration experience seeking to advance to architecture roles.\nConsultants and technical leaders who need to translate business requirements into scalable and secure technical solutions.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design, manage, and optimize infrastructure solutions in Microsoft Azure, ensuring performance, security, availability, and scalability in enterprise cloud environments.",
"Objetivo general": "Develop competencies to plan and manage complete infrastructure solutions in Azure, aligned with business needs and best practices in the cloud.",
"Objetivos específicos": "Design and implement secure and resilient workloads in Azure, using key services such as virtual machines, networks, and storage.\nManage identities, governance, and access control, applying Azure Active Directory and compliance policies.\nOptimize monitoring, automation, and business continuity using supervision tools, disaster recovery, and scalability.\n",
"Contenidos": "Design identity, governance, and monitoring solutions\n\nDesign data storage solutions\n\nDesign business continuity solutions\n\nDesign infrastructure solutions\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Designing and Implementing Microsoft DevOps solutions",
"course_image":"assets/courses/az-400t00_-designing-and-implementing-microsoft-devops-solutions.jpg",
"Área": "Azure Digital & App Innovation",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "DevOps engineers: Seeking to implement continuous integration and delivery (CI/CD) practices in Azure.\nAzure developers and administrators: Interested in automating processes and improving collaboration between development and operations teams.\nIT professionals: With Azure experience who want to advance to DevOps-focused roles.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to design, implement, and manage DevOps solutions in Azure, optimizing continuous integration, continuous delivery, and automation to accelerate application development and deployment.",
"Objetivo general": "Develop competencies to create and manage DevOps pipelines in Azure, integrating practices and tools that improve collaboration and efficiency in the software development lifecycle.\n",
"Objetivos específicos": "Configure and manage CI/CD pipelines in Azure DevOps to automate building, testing, and deployments.\nImplement infrastructure as code (IaC) using tools like ARM templates, Terraform, or Bicep to manage Azure resources.\nMonitor and optimize DevOps processes, ensuring quality, security, and scalability of implemented solutions.\n",
"Contenidos": "Design and implement processes and communications\n\nDesign and implement a source code control strategy\n\nDesign and implement build and release pipelines\n\nDevelop a security and compliance plan\n\nImplement an instrumentation strategy",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Azure Security Technologies",
"course_image":"assets/courses/az-500t00_-microsoft-azure-security-technologies.jpg",
"Área": "Security",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Azure security engineers: Professionals who implement, manage, and monitor security in Azure environments.\nIT and security professionals: Those responsible for the security of cloud resources and who want to expand their knowledge in Azure security tools and services.\nSolution consultants and architects: Who advise organizations on implementing secure solutions in the cloud using Azure.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to implement and manage security solutions in Microsoft Azure, protecting identities, data, applications, and networks in cloud environments.",
"Objetivo general": "Develop skills to design, implement, and manage security strategies in Azure, ensuring protection and compliance in cloud infrastructures.",
"Objetivos específicos": "Implement secure identity and access controls in Azure.\nProtect data and applications using cloud security technologies.\nConfigure and monitor network and resource security in Azure.\n",
"Contenidos": "Protect identities and access\n\nProtect networks\n\nProtect processes, storage, and databases\n\nProtect Azure using Microsoft Defender for Cloud and Microsoft Sentinel\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Designing and Implementing Microsoft Azure Networking Solutions",
"course_image":"assets/courses/az-700t00-designing-and-implementing-microsoft-azure-networking-solutions.jpg",
"Área": "Azure Infrastructure",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Network engineers: Professionals seeking to specialize in Azure networking solutions.\nSystem administrators and solution architects: Those responsible for designing and implementing cloud networking solutions.\nConsultants and support technicians: Who work with Azure-based solutions and want to formalize their networking knowledge.\n",
"Perfil de salida": "The participant will be able to design, implement, and manage secure and scalable networking solutions in Microsoft Azure, ensuring efficient connectivity between cloud resources and hybrid environments.",
"Objetivo general": "Train to plan, configure, and manage networking infrastructures in Azure that meet security, performance, and enterprise connectivity requirements.\n",
"Objetivos específicos": "Design and implement virtual networks and hybrid connectivity in Azure.\nConfigure security policies and access control to protect networks.\nMonitor and optimize the performance of networking solutions in Azure.\n",
"Contenidos": "Design and implement core networking infrastructure\n\nDesign, implement, and manage connectivity services\n\nDesign and implement application delivery services\n\nDesign and implement private access to Azure services\n\nDesign and implement Azure network security services",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Administering Windows Server Hybrid Core Infrastructure",
"course_image":"assets/courses/Administering-Windows-Server-Hybrid-Core-Infrastructure.webp",
"Área": "Azure Infrastructure",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Windows Server hybrid administrators: Professionals with Windows Server experience who want to expand the capabilities of their on-premises environments by combining on-premises and hybrid technologies.\nIT professionals: Those responsible for implementing and managing hybrid and on-premises solutions, such as identity, management, compute, networking, and storage in a Windows Server hybrid environment\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to manage Windows Server hybrid infrastructures, integrating on-premises and cloud resources to ensure availability, security, and operational efficiency.",
"Objetivo general": "Develop skills to implement, manage, and maintain hybrid infrastructures based on Windows Server, ensuring business continuity and resource optimization in on-premises and cloud environments.\n",
"Objetivos específicos": "Configure and manage core Windows Server services in both on-premises and hybrid environments.\nManage connectivity and integration with Microsoft Azure cloud services.\nImplement security policies and disaster recovery to maintain system integrity and availability.\n",
"Contenidos": "Deploy and manage Active Directory Domain Services (AD DS) in on-premises and cloud environments\n\nManage Windows servers and workloads in a hybrid environment\n\nManage virtual machines and containers\n\nImplement and manage a hybrid network infrastructure\n\nManage storage and file services\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Configuring Windows Server Hybrid Advanced Services",
"course_image":"assets/courses/AdvanceServices.webp",
"Área": "Azure Infrastructure",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Windows Server hybrid administrators: Professionals with Windows Server experience who want to expand the capabilities of their on-premises environments by combining on-premises and hybrid technologies.\nIT professionals: Those responsible for implementing and managing hybrid and on-premises solutions, such as identity, security, management, compute, networking, storage, supervision, high availability, and disaster recovery.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to configure, manage, and optimize Windows Server hybrid services, integrating on-premises and cloud environments to improve IT infrastructure efficiency and security.\n",
"Objetivo general": "Develop skills to implement and manage advanced hybrid Windows Server services, facilitating integrated management between on-premises and Azure environments.\n",
"Objetivos específicos": "Configure advanced hybrid services, such as Azure Arc and remote management for Windows Server.\nImplement high availability and disaster recovery solutions in hybrid environments.\nOptimize security and monitoring of servers integrated between on-premises infrastructure and the cloud.\n",
"Contenidos": "Secure on-premises and hybrid Windows Server infrastructures\n\nImplement and manage Windows Server high availability\n\nImplement disaster recovery\n\nMigrate servers and workloads\n\nMonitor and troubleshoot Windows Server environments\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Azure Fundamentals",
"course_image":"assets/courses/Azure-Fundamental.png",
"Área": "Azure Infrastructure",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "IT professionals: Seeking to familiarize themselves with cloud concepts and Azure.\nStudents: Interested in starting a career in cloud technologies.\nTechnical sales managers and personnel: Who want to understand Azure capabilities to make informed decisions.\nAnyone interested: In learning about the fundamentals of cloud computing and Azure services\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to understand the basic concepts of the cloud and the main services of Microsoft Azure, facilitating their use and adoption in different technological scenarios.",
"Objetivo general": "Provide a fundamental understanding of cloud services and the Azure platform to support technological and business decision-making.\n",
"Objetivos específicos": "Identify the basic concepts of cloud computing and its benefits.\nDescribe the main Microsoft Azure services and their use cases.\nRecognize security, privacy, and compliance options in Azure.\n",
"Contenidos": "Description of cloud concepts\n\nDescription of Azure architecture and services\n\nDescription of management and governance in Azure\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "15 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Designing and Implementing a Data Science Solution on Azure",
"course_image":"assets/courses/Designing-and-Implementing-a-Data-Science-Solution-on-Azure.webp",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Data scientists who already work on machine learning projects and want to use or migrate their workflows to Azure.\nData engineers and advanced analysts who want to automate, train, and deploy ML models in enterprise environments.\nIT professionals with experience in Python and data science, seeking to specialize in cloud solutions.\nAdvanced students in engineering, computer science, or related fields interested in learning how to take ML models from experimentation to production in Azure.\nSolution consultants and architects who design and implement architectures based on machine learning models in the cloud.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to design, implement, and optimize data science solutions in Azure, using tools and services to prepare data, train models, and deploy intelligent solutions in the cloud.",
"Objetivo general": "Train participants to develop effective data science solutions in Azure, applying machine learning techniques and advanced analysis to solve business problems.\n",
"Objetivos específicos": "Prepare and process data in Azure for analysis and modeling.\nTrain, evaluate, and tune machine learning models using Azure services.\nDeploy and manage models in production for scalable and efficient solutions.\n",
"Contenidos": "Design and prepare a machine learning solution\n\nExplore data and train models\n\nPrepare a model for deployment\n\nImplement and retrain a model\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Data Engineering on Microsoft Azure ",
"course_image":"assets/courses/azure-data-engineer-course.jpg",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Data professionals: Those who work with data and seek to deepen data engineering in the cloud.\nData architects: Interested in designing scalable and efficient data solutions in Azure.\nBusiness Intelligence (BI) professionals: Who want to learn about creating analytical solutions using data platform technologies in Azure\nData analysts and data scientists: Who work with Microsoft Azure-based analytical solutions and want to better understand the underlying infrastructure.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to design, implement, and manage data engineering solutions in Azure, integrating, transforming, and securing data to support analytical and business intelligence processes.",
"Objetivo general": "Train participants to create scalable data processing and storage solutions in Azure, ensuring quality, security, and efficiency in data management.\n",
"Objetivos específicos": "Implement and optimize data pipelines for ingestion, transformation, and loading in Azure environments.\nDesign and manage data storage using services like Azure Data Lake and Azure Synapse Analytics.\nEnsure data integrity, security, and governance in Azure-based solutions.\n",
"Contenidos": "Design and implement data storage\n\nDevelop data processing\n\nSecure, monitor, and optimize data storage and processing\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Fabric Analytics Engineer",
"course_image":"assets/courses/dp-600t00-microsoft-fabric-analytics-engineer.jpg",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Data professionals: With experience in modeling, extraction, and data analysis, seeking to deepen the use of Microsoft Fabric for analytical solutions.\nData analysts: Who want to expand their skills in creating semantic models and data analysis using advanced tools.\nData engineers: Interested in implementing and managing large-scale data analysis solutions\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design, implement, and manage data analysis solutions using Microsoft Fabric, optimizing data ingestion, processing, and visualization to support business decision-making.\n",
"Objetivo general": "Develop skills to configure and manage data analysis platforms in Microsoft Fabric, ensuring efficient processes for integration, transformation, and analysis of large volumes of information.\n",
"Objetivos específicos": "Implement data pipelines and orchestration in Microsoft Fabric to ensure continuous data ingestion and transformation.\nConfigure analytical environments and tools for data exploration and visualization.\nOptimize the performance and security of analytical solutions in Microsoft Fabric.\n",
"Contenidos": "Plan, implement, and manage a data analysis solution\n\nData ingestion and transformation\n\nVisualize and deliver data\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Azure Data Fundamentals",
"course_image":"assets/courses/dp-900-microsoft-azure-data-fundamentals-course.jpg",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "People starting their career in data: Those seeking to understand the fundamentals of data in the cloud.\nIT professionals, students, or non-technical profiles: Interested in acquiring a solid foundation in database concepts and data analysis in Azure.\nCandidates for advanced Azure certifications: Such as Azure Database Administrator Associate or Azure Data Engineer Associate, who want to establish a strong foundation before advancing\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to understand basic data concepts in the cloud, including relational and non-relational database services, and handle data in Microsoft Azure to support enterprise solutions.",
"Objetivo general": "Provide fundamental knowledge on data concepts and cloud storage services, with emphasis on the Microsoft Azure platform.\n",
"Objetivos específicos": "Understand basic data concepts and both relational and non-relational databases.\nKnow the data services offered by Microsoft Azure and their use cases.\nFamiliarize with data analysis and processing concepts in the cloud.\n",
"Contenidos": "Describe basic data concepts\n\nIdentify considerations for relational data on Azure\n\nDescribe considerations for non-relational data on Azure\n\nDescribe an analytical workload on Azure\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "8 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Dynamics 365 Customer service",
"course_image":"assets/courses/customer-service-overview.png",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "The Microsoft Dynamics 365 Customer Service course is primarily aimed at professionals who perform the role of Dynamics 365 Customer Service Functional Consultant.",
"Perfil de salida": "Upon completing the certification, the participant will be able to configure and optimize Dynamics 365 Customer Service solutions, improving customer service management and facilitating efficient and personalized service experiences.",
"Objetivo general": "Develop competencies to implement and customize Dynamics 365 Customer Service functionalities, aligned with business needs to optimize customer satisfaction.",
"Objetivos específicos": "Configure cases, queues, and routing for efficient service request management.\nCustomize environments and processes to improve customer experience and team productivity.\nIntegrate tools and functionalities for effective multichannel support and service analysis.\n",
"Contenidos": "Manage cases, knowledge management, and feedback\n\nImplement scheduling and routing\n\nImplement Dynamics 365 Contact Center\n\nExtend Customer Service using Microsoft Power Platform\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365 Field Service",
"course_image":"assets/courses/Picture2.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Dynamics 365 Field Service functional consultants: Responsible for implementing solutions that optimize resource scheduling and improve field service efficiency.\nIT professionals: With experience or interest in providing field service solutions for large-scale clients.\nCRM administrators: Who manage service solutions in large organizations and seek to integrate field service functionalities.\nOperations professionals: Who oversee mobile teams and want to improve work order management and resource scheduling\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to configure and manage Dynamics 365 Field Service solutions, optimizing planning, execution, and monitoring of field services to improve customer experience and operational efficiency.",
"Objetivo general": "Develop competencies to implement and customize Dynamics 365 Field Service, facilitating automation and optimization of field service processes aligned with business objectives.\n",
"Objetivos específicos": "Configure key Field Service functionalities such as order management, inventories, and resources.\nOptimize technician scheduling and dispatching to improve efficiency and response times.\nImplement monitoring and analysis to ensure service quality and customer satisfaction.\n",
"Contenidos": "Configure Field Service applications\n\nManage customer work orders and assets\n\nSchedule and dispatch work orders\n\nManage the Field Service mobile app\n\nManage inventory and purchasing, and connected Field Service\n\nImplement Microsoft Power Platform\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365 Finance",
"course_image":"assets/courses/Microsoft-Dynamics-365-Finance-Operations-U.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Dynamics 365 Finance functional consultants: Responsible for analyzing business requirements and translating them into efficient financial processes and solutions.\nFinance and accounting professionals: With fundamental knowledge in accounting principles and financial operations, interested in deepening financial management within Dynamics 365.\nBusiness operations specialists: Seeking to optimize financial processes in areas such as manufacturing, retail, and supply chain management.\nCandidates for the Microsoft Certified: Dynamics 365 Finance Functional Consultant Associate certification: Who want to prepare for the MB-310 exam\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to configure, manage, and optimize financial and operational processes using Microsoft Dynamics 365 Finance, facilitating decision-making and efficient resource control in the organization.",
"Objetivo general": "Develop skills to implement and manage financial and operational solutions in Dynamics 365, improving efficiency and accuracy in business management.\n",
"Objetivos específicos": "Configure key financial and operational modules to support accounting, budgeting, and operations processes.\nManage and optimize financial workflows, integrating data for reliable analysis and reports.\nFacilitate automation and regulatory compliance through effective use of Dynamics 365 tools.\n",
"Contenidos": "Configure and apply financial management\n\nImplement financial modules\n\nConfigure accounting structures\n\nManage periodic financial closings\n\nImplement cost policies, reconciliation, and consolidation\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365 Supply Chain Management",
"course_image":"assets/courses/product-roundup-post-8.png.webp",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Dynamics 365 Supply Chain Management functional consultants: Responsible for analyzing business requirements and translating them into efficient solutions that implement industry-recommended practices.\nOperations and logistics professionals: Who want to optimize inventory, warehouse, transportation, and planning processes within their organization.\nManufacturing and distribution specialists: Interested in improving operational efficiency through advanced technological solutions.\nCandidates for the Microsoft Certified: Dynamics 365 Supply Chain Management Functional Consultant Associate certification: Seeking to prepare for the MB-330 exam\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to configure, implement, and optimize supply chain management solutions using Dynamics 365, improving operational efficiency and visibility in logistics and production processes.",
"Objetivo general": "Develop skills to manage and optimize supply chain processes through the effective implementation of Microsoft Dynamics 365 functionalities.\n",
"Objetivos específicos": "Configure and manage key supply chain modules such as inventory, production, and logistics in Dynamics 365.\nAnalyze and improve operational processes to increase efficiency and reduce costs.\nIntegrate Dynamics 365 solutions with other business areas to ensure coherent and effective information flow.\n",
"Contenidos": "Implement product information management\n\nImplement inventory and asset management\n\nImplement and manage supply chain processes\n\nImplement warehouse and transportation management\n\nImplement master planning\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365 Supply Chain Management, Expert",
"course_image":"assets/courses/banner.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Advanced Dynamics 365 Supply Chain Management functional consultants: Professionals who already have experience with the platform and want to specialize in advanced features.\nSolution architects and operations managers: Who lead digital transformation projects in logistics and manufacturing areas.\nIT professionals involved in implementing complex supply chain management solutions: Seeking to optimize business processes through advanced technologies.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to implement and optimize supply chain management solutions using Dynamics 365, improving operational efficiency and visibility in logistics and production processes.",
"Objetivo general": "Train participants to design, configure, and manage supply chain processes through Dynamics 365, aligning technology and business to optimize operations.\n",
"Objetivos específicos": "Configure and manage key Dynamics 365 modules for the supply chain.\nImprove inventory planning and control, production, and logistics.\nApply best practices for data integration and analysis in Supply Chain Management.\n",
"Contenidos": "Configure products\n\nConfigure production prerequisites\n\nImplement production methods\n\nConfigure production control\n\nImplement additional supply chain functionalities",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": 32,
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365: Finance and Operations Apps Developer",
"course_image":"assets/courses/Microsoft-Dynamics-365-Finance-Operations-U.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Dynamics 365 Finance and Operations developers: Professionals responsible for designing, developing, testing, and maintaining solutions based on D365FO.\nERP technical consultants: Specialists in ERP system implementation and customization who want to deepen in D365FO.\nSoftware engineers and solution architects: Seeking to integrate D365FO with other applications and platforms.\nTechnical advisors and consultants: Who provide guidance on D365FO implementation and customization.\nUser experience leaders: Interested in improving user interaction with D365FO.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to develop, customize, and implement applications in Dynamics 365 Finance and Operations, optimizing financial and operational processes through solutions tailored to business needs.\n",
"Objetivo general": "Develop skills to create and maintain customized applications in Dynamics 365 Finance and Operations, facilitating automation and improvement of business processes.\n",
"Objetivos específicos": "Design and develop extensions and customizations in Dynamics 365 Finance and Operations.\nIntegrate applications with other systems and services to ensure interoperability.\nImplement and test solutions ensuring quality and performance in production environments.\n",
"Contenidos": "Develop business logic using X++\n\nCreate and modify reports and workspaces\n\nCustomize the user interface\n\nProvide endpoints and API for Power Platform and external systems\n\nPerform testing\n\nMonitor performance\n\nAnalyze and manipulate data\n\nManage implementations using ALM\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Dynamics 365 Business Central Developer",
"course_image":"assets/courses/bs-365.png",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Business Central developers: Professionals responsible for designing, developing, testing, and maintaining solutions based on Business Central.\nERP technical consultants: Specialists in ERP system implementation and customization who want to deepen in Business Central.\nSoftware engineers and solution architects: Seeking to integrate Business Central with other applications and platforms.\nTechnical advisors and consultants: Who provide guidance on Business Central implementation and customization.\nUser experience leaders: Interested in improving user interaction with Business Central.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to develop, customize, and implement solutions in Dynamics 365 Business Central, improving business processes through extension and adaptation of functionalities in the platform.",
"Objetivo general": "Develop skills to create and customize applications in Dynamics 365 Business Central, facilitating automation and optimization of business processes in enterprise environments.",
"Objetivos específicos": "Configure and extend standard functionalities using AL and Visual Studio Code.\nImplement integrations and customizations to adapt the solution to specific needs.\nTest and deploy applications ensuring quality and performance in production environments.\n",
"Contenidos": "Design, develop, test, and maintain solutions based on Business Central\n\nExtend functionalities through AL extensions\n\nIntegrate Business Central with Power Platform and other applications\n\nDebug and troubleshoot errors\n\nOptimize system performance\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365 Fundamentals Customer Engagement Apps",
"course_image":"assets/courses/customer-engagement.png",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "IT professionals: Seeking to understand Dynamics 365 customer engagement applications.\nInterested in CRM-related roles: Such as CRM administrators, sales executives, customer service representatives, and marketing specialists.\nStudents and career changers: Who want to acquire fundamental knowledge about Dynamics 365 applications to advance their careers.\nEntrepreneurs and business owners: Seeking to improve customer relationship management through technological solutions.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to understand and use the basic functionalities of Dynamics 365 Customer Engagement, facilitating customer relationship management and improving business processes through integrated CRM solutions.",
"Objetivo general": "Provide fundamental knowledge to configure and manage Dynamics 365 applications focused on customer and sales management, supporting digital transformation and customer service improvement.\n",
"Objetivos específicos": "Understand the capabilities and key components of Dynamics 365 Customer Engagement Apps for sales, marketing, and customer service.\nConfigure and customize basic functionalities to adapt the solution to business needs.\nUse tools to analyze data and improve customer interaction, optimizing business processes.\n",
"Contenidos": "Introduction to customer engagement\n\nMarketing, sales, and customer service capabilities\n\nField Service and work order management\n\nUse of Copilot in engagement tasks\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "12 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Dynamics 365 Fundamentals Finance and Operations App",
"course_image":"assets/courses/fundamental_finance_and_operations.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "IT professionals: Seeking to familiarize themselves with Dynamics 365 finance and operations applications.\nBusiness decision-makers: Who want to understand how Dynamics 365 can integrate into their operations.\nStudents and recent graduates: Seeking to acquire fundamental knowledge about Dynamics 365 applications.\nCareer changers: Who want to leverage Dynamics 365 to advance their professional paths\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to understand and explain the key concepts of Microsoft Dynamics 365 finance and operations applications, facilitating their use to improve business processes and support digital transformation in organizations.",
"Objetivo general": "Provide fundamental knowledge on the functionalities and benefits of Microsoft Dynamics 365 Finance and Operations, allowing a clear vision of its application in business management and ERP process optimization.",
"Objetivos específicos": "Identify the main components and functionalities of Dynamics 365 Finance and Operations.\nUnderstand how Dynamics 365 supports financial, supply chain, and business operations processes.\nRecognize the impact of Dynamics 365 on digital transformation and continuous business improvement.\n",
"Contenidos": "Introduction to ERP and financial management\n\nDynamics 365 Finance capabilities\n\nDynamics 365 Supply Chain Management capabilities\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "12 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft 365 Endpoint Administrator",
"course_image":"assets/courses/md-102t00-microsoft-365-endpoint-administrator-banner.webp",
"Área": "Modern Work",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "IT administrators: Responsible for implementing, configuring, securing, managing, and monitoring devices and client applications in an organization.\nProfessionals managing Windows 11 devices and later: As well as non-Windows-based devices.\nSecurity and compliance specialists: Seeking to strengthen endpoint protection using tools like Microsoft Defender for Endpoint.\nProfessionals interested in modern device management: Using technologies such as Microsoft Intune, Windows Autopilot, and Azure Virtual Desktop.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to manage and protect endpoint devices in Microsoft 365 environments, ensuring efficient, secure, and unified management of equipment and applications.\n",
"Objetivo general": "Develop competencies to implement, configure, and manage endpoint administration solutions in Microsoft 365, ensuring security and productivity in the organization.",
"Objetivos específicos": "Configure and manage devices and applications using Microsoft Endpoint Manager.\nImplement security and compliance policies to protect endpoints.\nMonitor and troubleshoot issues related to device management in Microsoft 365.\n",
"Contenidos": "Prepare infrastructure for devices\n\nManage and maintain devices\n\nManage applications\n\nProtect devices\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft 365 Administrator",
"course_image":"assets/courses/madministrator.webp",
"Área": "Modern Work",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Microsoft 365 administrators: Responsible for implementing, configuring, and managing Microsoft 365 environments at the tenant level.\nIT professionals with experience in Microsoft 365 workloads: Such as Exchange Online, SharePoint Online, Microsoft Teams, and Microsoft Entra ID (formerly Azure Active Directory).\nSecurity and compliance specialists: Interested in managing security, threats, and regulatory compliance using tools like Microsoft Defender and Microsoft Purview.\nIndividuals who have obtained associated certifications: Such as Endpoint Administrator Associate, Messaging Administrator Associate, Teams Administrator Associate, Identity and Access Administrator Associate, or Information Protection and Compliance Administrator Associate, and want to advance to the expert level certification.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to manage and optimize Microsoft 365 environments, managing identities, services, security, and compliance to ensure an efficient and secure infrastructure in the company.",
"Objetivo general": "Develop competencies to plan, implement, and manage Microsoft 365 solutions, ensuring effective management of users, devices, and security policies in enterprise environments.\n",
"Objetivos específicos": "Manage identities and access, implementing secure authentication and authorization.\nAdminister Microsoft 365 services, including Exchange, SharePoint, Teams, and OneDrive.\nConfigure and monitor security and compliance, applying policies and controls to protect information.\n",
"Contenidos": "Manage and implement a Microsoft 365 tenant\n\nImplement and manage identities and access with Microsoft Entra\n\nManage security and threats with Microsoft Defender XDR\n\nManage compliance with Microsoft Purview\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Managing Microsoft Teams",
"course_image":"assets/courses/blog_post.svg",
"Área": "Modern Work",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Microsoft Teams administrators: Responsible for planning, implementing, configuring, and managing Microsoft Teams to facilitate effective collaboration and communication in a Microsoft 365 environment.\nIT professionals: Interested in deepening their knowledge of Teams administration, including managing teams, channels, chats, apps, meetings, calls, and certified devices for Teams.\nAspirants to the Microsoft 365 Certified: Teams Administrator Associate certification: This course prepares participants for the MS-700 exam, required to obtain this certification.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to manage and administer Microsoft Teams effectively, configuring policies, security, and collaboration to optimize communication and teamwork in enterprise environments.",
"Objetivo general": "Develop the necessary skills to implement, manage, and maintain Microsoft Teams, ensuring a secure and efficient collaborative environment for users and organizations.",
"Objetivos específicos": "Configure and manage Teams infrastructure and policies, including permissions, roles, and app configuration.\nManage security and compliance, applying access controls and data protection in Teams.\nOptimize user experience and collaboration, facilitating integration with other tools and resolving common issues.\n",
"Contenidos": "Plan network configuration for Teams\n\nManage security and compliance in Teams\n\nPlan and apply governance for Teams\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Collaboration Communications Systems Engineer",
"course_image":"assets/courses/898962204_1723197846.png",
"Área": "Modern Work",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Network and systems engineers: Seeking to implement and manage unified communication solutions based on Microsoft Teams.\nIT and Microsoft 365 administrators: Responsible for configuring and managing communication and collaboration services in the organization.\nCollaboration solution consultants and architects: Who design and implement enterprise communication infrastructures.\nTechnical support and operations professionals: Responsible for maintaining and troubleshooting communication systems and associated devices.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design, implement, and manage communication and collaboration solutions in Microsoft environments, optimizing user experience and ensuring efficient system integration.\n",
"Objetivo general": "Develop skills to manage Microsoft communication and collaboration infrastructures, ensuring secure, scalable solutions aligned with business needs.",
"Objetivos específicos": "Configure and manage communication platforms such as Microsoft Teams and Skype for Business.\nImplement security and compliance policies in collaboration systems.\nOptimize performance and troubleshoot in unified communications environments.\n",
"Contenidos": "Plan and design collaborative communication systems\n\nConfigure and manage Teams meetings, webinars, and town halls\n\nConfigure and manage Teams Phone\n\nConfigure and manage Teams Rooms devices and rooms\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft 365 Fundamentals",
"course_image":"assets/courses/MS-900-1-1024x576.png",
"Área": "Modern Work",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "IT professionals: Who want to acquire fundamental knowledge about Microsoft 365 services and cloud computing.\nBusiness decision-makers: Interested in understanding how Microsoft 365 can improve productivity and collaboration in their organizations.\nStudents and beginners: Seeking to introduce themselves to the world of cloud services and Microsoft 365.\nEntrepreneurs and managers: Considering adopting cloud collaboration and productivity solutions for their businesses.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to understand the fundamental concepts of Microsoft 365, including its services, benefits, subscription models, security, compliance, and cloud productivity.",
"Objetivo general": "Provide a basic understanding of the key services and functionalities of Microsoft 365, its business value, and how it supports modern and secure work in the cloud.",
"Objetivos específicos": "Identify the key components and benefits of Microsoft 365, such as Teams, Exchange, SharePoint, and OneDrive.\nUnderstand the principles of security, compliance, and privacy integrated into Microsoft 365.\nRecognize licensing and support options, as well as common usage scenarios in organizations.\n",
"Contenidos": "Describe cloud concepts\n\nDescribe Microsoft 365 applications and services\n\nDescribe security, compliance, privacy, and trust in Microsoft 365\n\nDescribe Microsoft 365 pricing, licensing, and support\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "12 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Power Platform Functional Consultant",
"course_image":"assets/courses/pl-200t00-microsoft-power-platform-functional-consultant.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Functional consultants: Responsible for translating business needs into technical solutions using Power Platform.\nBusiness analysts: Seeking to automate processes and improve operational efficiency through low-code tools.\nIT professionals: Interested in acquiring skills to create applications, automate workflows, and analyze data without advanced programming.\nDevelopers and solution architects: Who want to deepen the configuration and customization of business solutions with Power Platform.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design, implement, and configure business solutions using Microsoft Power Platform, integrating applications, process automation, data analysis, and chatbots to improve organizational efficiency.",
"Objetivo general": "Train functional consultants capable of creating effective business solutions through the use of Power Apps, Power Automate, Power BI, and Power Virtual Agents, aligned with business needs.",
"Objetivos específicos": "Develop business applications with Power Apps that allow digitizing processes and improving user experience.\nAutomate workflows and routine processes through Power Automate, increasing productivity.\nImplement interactive dashboards and reports with Power BI to support data-based decision-making.\n",
"Contenidos": "Configure Microsoft Dataverse\n\nCreate applications with Power Apps\n\nCreate and manage logic and process automation\n\nManage Power Platform environments\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Power BI Data Analyst",
"course_image":"assets/courses/microsoft-certified-power-bi-data-analyst-associate.jpg",
"Área": "DATA & AI",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Data analysts and business intelligence professionals: Who want to learn to perform accurate data analysis using Power BI.\nPeople who develop reports: Who visualize data from existing data platform technologies both in the cloud and on-premises.\nStudents and evolving professionals: Seeking to start or update their skills in data analysis and Power BI.\nInnovative companies: That want to train their team in the fundamentals of data analysis to improve efficiency and business strategy\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to prepare, model, visualize, and analyze data using Power BI, generating interactive reports that facilitate data-based decision-making.",
"Objetivo general": "Develop skills to transform data into useful information, through the use of Power BI, applying best practices in analysis, modeling, and visualization.",
"Objetivos específicos": "Import, clean, and transform data from various sources using Power BI tools.\nCreate efficient data models and relationships between tables, applying DAX for calculations and measures.\nDesign interactive visualizations and dashboards that communicate key findings clearly and effectively.\n",
"Contenidos": "Prepare data\n\nModel data\n\nVisualize and analyze data\n\nManage and protect Power BI\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "21 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Power Platform Developer",
"course_image":"assets/courses/Featured-image-power-platform-1024x643.png",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Software developers: With experience in languages like C#, JavaScript, TypeScript, and HTML, interested in creating customized solutions in Power Platform.\nTechnical consultants and solution architects: Who work on implementing and customizing business applications using Power Platform.\nIT professionals: Seeking to integrate and extend Power Platform functionalities with other services and systems.\nBusiness application development teams: Who want to improve productivity and efficiency through process automation and custom application creation.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to create, extend, and customize solutions with Microsoft Power Platform, integrating applications, automation, artificial intelligence, and data to improve business processes.",
"Objetivo general": "Develop skills to build complete solutions in Power Platform that optimize productivity and solve business needs through Power Apps, Power Automate, Power BI, and Power Virtual Agents.",
"Objetivos específicos": "Design and implement custom applications using Power Apps with custom components and complex logics.\nAutomate business processes through workflows with Power Automate and integration with external services.\nExtend platform capabilities using custom connectors, APIs, and Azure for advanced solutions.\n",
"Contenidos": "Design a technical architecture\n\nBuild solutions with Power Platform\n\nImplement improvements in Power Apps\n\nExtend the user experience\n\nExtend the platform\n\nDevelop integrations \n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "24 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Power Automate RPA Developer",
"course_image":"assets/courses/pl-500t00-microsoft-power-automate-rpa-developer.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Software developers: Interested in designing, developing, implementing, and maintaining robotic process automation (RPA) solutions using Microsoft Power Automate.\nProcess analysts and IT professionals: Seeking to optimize and automate business workflows to improve operational efficiency.\nConsultants and solution architects: Who collaborate with business stakeholders to identify automation opportunities and develop effective solutions.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design, develop, and maintain robotic process automation (RPA) solutions with Microsoft Power Automate, optimizing repetitive tasks and improving operational efficiency in enterprise environments.",
"Objetivo general": "Train the participant to create automated workflows that integrate applications and services using Power Automate, applying RPA practices for digital transformation of processes.\n",
"Objetivos específicos": "Design and build automated flows through Power Automate Desktop and cloud services.\nIntegrate RPA with enterprise systems and data, using connectors, expressions, and custom actions.\nManage, debug, and optimize RPA solutions, ensuring scalability, security, and continuous maintenance.\n",
"Contenidos": "Design automations\n\nDevelop automations\n\nImplement and manage automations \n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "32 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Power Platform Solution Architect",
"course_image":"assets/courses/6003144_28da.webp",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Senior consultants, both functional and technical, aspiring to become solution architects.\nCurrent solution architects who are new to the role or want to formalize and deepen their knowledge in solution architecture with Power Platform\n",
"Perfil de salida": "Upon completing the certification, the participant will be prepared to design complete business solutions using Microsoft Power Platform, integrating applications, automations, data analysis, and artificial intelligence, aligned with the strategic needs of the business.",
"Objetivo general": "Train experts capable of defining architecture, guiding technical decisions, and leading implementations of solutions in Power Platform, ensuring alignment with client objectives and Microsoft best practices.",
"Objetivos específicos": "Design robust technical and functional architectures using Power Apps, Power Automate, Power BI, and Power Virtual Agents.\nGuide development and business teams in implementing scalable, secure, and user-centered solutions.\nIntegrate Power Platform with other Microsoft and third-party services, optimizing processes and improving end-user experience.\n",
"Contenidos": "Perform solution vision design and requirements analysis\n\nSolution architecture\n\nImplement the solution \n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "27 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Power Platform Fundamentals",
"course_image":"assets/courses/pl-900t00_-microsoft-power-platform-fundamentals.jpg",
"Área": "Business Applications",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Business users and business professionals: Seeking to improve productivity through process automation, data analysis, and simple application creation.\nStudents and recent graduates: Interested in acquiring fundamental knowledge about Power Platform to start a career in technology or data analysis.\nIT professionals and developers: Who want to obtain a basic understanding of Power Platform capabilities to integrate them into broader solutions.\nBusiness consultants and analysts: Seeking to understand how Power Platform tools can be applied to solve business challenges.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to understand and use the fundamental components of Microsoft Power Platform, allowing them to automate processes, analyze data, and create simple business solutions without advanced programming.",
"Objetivo general": "Provide a basic understanding of Power Platform tools to improve business productivity through automation, data analysis, and customized application creation.\n",
"Objetivos específicos": "Identify and explain the key components of Power Platform, including Power BI, Power Apps, Power Automate, and Power Virtual Agents.\nRecognize how these tools integrate with each other and with other Microsoft 365 and Azure services.\nUnderstand the benefits of applying Power Platform to solve common business problems through accessible digital solutions.\n",
"Contenidos": "Describe the business value of Power Platform\n\nManage the Power Platform environment\n\nDemonstrate the capabilities of Power Apps\n\nDemonstrate the capabilities of Power Automate\n\nDemonstrate the capabilities of Power Pages",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "12 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Cybersecurity Architect",
"course_image":"assets/courses/1673368160553.png",
"Área": "Security",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Cybersecurity architects: Who want to deepen the design of security architectures based on Zero Trust principles and the implementation of security solutions for hybrid and multicloud infrastructures.\nCloud security engineers: With experience in implementing security solutions on platforms like Azure, Microsoft 365, and other cloud services.\nSecurity consultants: Who advise organizations on creating security, regulatory compliance, and security operations strategies.\nIT professionals with a security focus: Such as system administrators, network engineers, and security operations analysts, seeking to specialize in cybersecurity solution architecture.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to design and implement comprehensive cybersecurity architectures in Microsoft environments, protecting identities, data, applications, and infrastructures against advanced threats.",
"Objetivo general": "Train professionals capable of defining enterprise security strategies and solutions, aligned with Microsoft best practices and focused on proactive protection and organizational resilience.",
"Objetivos específicos": "Design security solutions in the cloud and hybrid environments, including identity protection, endpoints, networks, and workloads.\nIntegrate Microsoft security tools such as Defender, Sentinel, Purview, and Entra into a unified architecture.\nEstablish governance policies and incident response, ensuring regulatory compliance and risk reduction.\n",
"Contenidos": "Design solutions aligned with security practices (Zero Trust)\n\nDesign security operations, identity, and compliance\n\nDesign security for infrastructure\n\nDesign security for applications and data ",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "21 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Security Operations Analyst",
"course_image":"assets/courses/images.jpeg",
"Área": "Security",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Security operations analysts who investigate, respond to, and hunt threats using tools like Microsoft Sentinel, Microsoft Defender XDR, and Defender for Cloud.\nSecurity engineers who implement and manage security solutions in hybrid and cloud environments.\nSecurity consultants who advise organizations on protection and risk mitigation.\nSystem and network administrators who manage technological infrastructures and want to strengthen the security of their environments.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to monitor, detect, investigate, and respond to security threats in hybrid environments, using solutions like Microsoft Sentinel, Defender, and other Microsoft 365 tools.",
"Objetivo general": "Train professionals capable of protecting enterprise environments through alert management, incident response, and continuous improvement of security operations with Microsoft technologies.\n",
"Objetivos específicos": "Implement and configure security monitoring tools, such as Microsoft Sentinel and Defender for Endpoint.\nInvestigate and respond to security incidents, using forensic analysis techniques and data correlation.\nReduce risks and strengthen security posture through task automation and proactive policy application.\n",
"Contenidos": "Manage a security operations environment\n\nConfigure protection and detection\n\nManage incident response\n\nManage security threats\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "21 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Identity and Access Administrator",
"course_image":"assets/courses/microsoft-certified-identity-and-access-administrator-associate.jpg",
"Área": "Security",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Identity and access administrators: Responsible for designing, implementing, and operating identity and access management systems in an organization, using Microsoft Entra ID (formerly Azure Active Directory).\nSecurity engineers and IT professionals: Seeking to deepen the implementation of identity and access solutions, and play an integral role in organizational protection.\nProfessionals planning to obtain the SC-300 certification: And want to prepare adequately for the associated exam.\n",
"Perfil de salida": "Upon completing the certification, the participant will be trained to manage identities, access, and user protection in Microsoft environments, implementing secure and efficient solutions with Azure Active Directory (Entra ID) and related services.\n",
"Objetivo general": "Develop competencies to design, implement, and manage identity and access control solutions in Microsoft 365 and Azure environments, ensuring security, compliance, and user experience.",
"Objetivos específicos": "Manage identities and authentication using Azure AD, including users, groups, and hybrid synchronization.\nImplement conditional access policies and multifactor authentication, strengthening security in resource access.\nMonitor, troubleshoot, and protect identity environments, applying governance and compliance practices.\n",
"Contenidos": "Implement and manage user identities\n\nImplement authentication and access management\n\nPlan and implement workload identities\n\nPlan and automate identity governance\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "21 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Information Protection Administrator",
"course_image":"assets/courses/150252466_1743676187.webp",
"Área": "Security",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Information protection administrators: Responsible for translating an organization's risk and compliance requirements into technical implementations.\nCompliance and security professionals: Who work on implementing and managing solutions for content classification, data loss prevention (DLP), information protection, data lifecycle management, records management, privacy, and compliance.\nCross-functional collaborators: Who collaborate with governance, data, and security roles to evaluate and develop policies that address an organization's risk reduction and compliance objectives.\nWorkload administrators and legal stakeholders: Who help implement technological solutions that support necessary policies and controls.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to implement and manage information protection solutions in Microsoft environments, ensuring confidentiality, integrity, and compliance of sensitive data in the organization.",
"Objetivo general": "Develop competencies to design, configure, and manage information protection policies, aligned with security and corporate regulatory needs in Microsoft 365 and Azure.",
"Objetivos específicos": "Configure sensitivity labels and protection policies to classify and protect critical data.\nImplement data loss prevention (DLP) solutions and monitoring of confidential information.\nManage access and regulatory compliance through audits, reports, and controls in Microsoft Information Protection.\n",
"Contenidos": "Implement information protection\n\nImplement data loss prevention and retention\n\nManage risks, alerts, and activities\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "21 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
{
"Certificaciones": "Microsoft Security, Compliance, and Identity Fundamentals",
"course_image":"assets/courses/MC-Security-Compliance-Identity-Fundamentals.webp",
"Área": "Security",
"Ente Certificador": "Microsoft",
"Dirigido a / Perfil de entrada": "Business users and non-technical professionals interested in learning fundamental concepts of security and compliance, especially in cloud-based environments.\nNew IT professionals or students beginning their career in cybersecurity or system administration.\nPeople working in governance, risk management, regulatory compliance, or data protection areas, who need to understand how Microsoft addresses these topics.\nAspirants to more advanced Microsoft certifications, such as SC-200 (Security Operations Analyst), SC-300 (Identity and Access Administrator), or SC-400 (Information Protection Administrator), as SC-900 provides a solid foundation.\n",
"Perfil de salida": "Upon completing the certification, the participant will be able to understand and apply basic concepts of security, compliance, and identity in Microsoft environments, helping to protect data and manage risks in the cloud and on-premises.",
"Objetivo general": "Provide fundamental knowledge on security, compliance, and identity management to protect resources on Microsoft platforms.",
"Objetivos específicos": "Understand the basic principles of security and data protection in Microsoft 365 and Azure.\nKnow the tools and practices to ensure regulatory compliance and privacy.\nManage identities and access to maintain security in hybrid and cloud environments.\n",
"Contenidos": "Describe concepts of security, compliance, and identity\n\nDescribe the capabilities of Microsoft Entra\n\nDescribe the capabilities of Microsoft security solutions\n\nDescribe the capabilities of Microsoft compliance solutions\n",
"Vigencia Certificación": "Does not expire",
"Cantidad de horas de capacitación": "12 hours",
"Metodología (examen o proyecto)": "Exam",
"Cantidad de intentos": "1 attempt with possibility of a second attempt. (The cost will depend on the exam to be repeated)",
"Modalidad": "Live virtual modality"
},
// Additional Courses
// {
// "course_image":"assets/courses/certified_tester_foundation_level.jpg",
// "Certificaciones": "Certified Software Tester - Foundation Level (CSTFL)",
// "Área": "SOFTWARE TESTING",
// "Ente Certificador": "ISTQB",
// "Dirigido a / Perfil de entrada": "Professionals involved in software testing.\nBeginner testers, developers, and analysts who want to acquire basic knowledge in testing.\nStudents and professionals seeking to start a career in software quality.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to demonstrate practical knowledge of fundamental software testing concepts, including principles, processes, and basic techniques to ensure software quality.",
// "Objetivo general": "Provide participants with a solid foundation on the fundamental principles of software testing and its practical implementation, without requiring extensive prior experience.",
// "Objetivos específicos": "Recognize key concepts of software testing, such as testing principles and lifecycle.\nExplore available static and dynamic testing techniques.\nEvaluate how to apply tools and management in software testing ethically and responsibly.\n",
// "Contenidos": "Fundamentals of testing\n\nTesting throughout the software lifecycle\n\nStatic techniques\n\nTest design techniques\n\nTest management\n\nTool support for testing",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "24 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "Unlimited attempts with payment for repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_5129.png",
// "Certificaciones": "IMTQN Certified Mobile Application Tester (CMAT)",
// "Área": "MOBILE APPLICATION TESTING",
// "Ente Certificador": "GAQM / IMTQN",
// "Dirigido a / Perfil de entrada": "Professionals in mobile application testing.\nDevice and software testers who want to specialize in mobile testing.\nDevelopers and professionals seeking to validate skills in app testing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to validate knowledge in mobile application testing, covering device testing, performance, and security.",
// "Objetivo general": "Provide participants with a solid foundation on testing principles in mobile applications and their practical implementation through international standards.",
// "Objetivos específicos": "Recognize key concepts of mobile testing, such as tools and methodologies.\nExplore testing functionalities on mobile platforms.\nEvaluate mobile applications ethically, considering security and performance.\n",
// "Contenidos": "Introduction to mobile testing\n\nTesting tools and methodologies\n\nPerformance and security testing\n\nTesting on devices and emulators\n\nMobile app use cases",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "2 attempts",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/12-1.webp",
// "Certificaciones": "Certified Agile Scrum Master (CASM)",
// "Área": "AGILE MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals interested in agile methodologies.\nProject managers and teams who want to implement Scrum.\nStudents and professionals seeking roles in agile management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to understand and apply the Scrum framework, facilitating agile teams and solving problems in projects.",
// "Objetivo general": "Provide participants with solid knowledge on agile principles and Scrum to lead teams effectively.",
// "Objetivos específicos": "Recognize key concepts of Scrum and agile methodologies.\nExplore roles, events, and artifacts in Scrum.\nEvaluate the application of Scrum in projects responsibly.\n",
// "Contenidos": "Agile principles and Scrum\n\nRoles in Scrum\n\nEvents and artifacts\n\nAgile project management\n\nContinuous improvement",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/certified-scrum-product-owner-igmguru_2063797947_l.jpg",
// "Certificaciones": "Certified Agile Scrum Product Owner (CASPO)",
// "Área": "AGILE MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in product roles.\nManagers who manage backlogs and prioritize value.\nStudents interested in agile ownership.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to prioritize value for the customer and manage backlogs in Scrum environments.",
// "Objetivo general": "Teach participants how to maximize product value using Scrum.",
// "Objetivos específicos": "Recognize the Product Owner role in Scrum.\nExplore backlog management techniques.\nEvaluate ethical decisions in product prioritization.\n",
// "Contenidos": "Product Owner role\n\nBacklog management\n\nValue prioritization\n\nTeam collaboration\n\nProduct improvement",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Practitioner.jpg",
// "Certificaciones": "Certified SAFe Practitioner (CSP)",
// "Área": "SCALED AGILE MANAGEMENT",
// "Ente Certificador": "GAQM / Scaled Agile",
// "Dirigido a / Perfil de entrada": "Members of Agile Release Trains teams.\nProfessionals in scaled agile environments.\nStudents seeking to scale Agile.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to collaborate in Agile Release Trains and deliver value in SAFe environments.",
// "Objetivo general": "Provide knowledge to work in SAFe and scaled Agile environments.",
// "Objetivos específicos": "Recognize SAFe concepts and Agile Release Trains.\nExplore roles in SAFe.\nEvaluate ethical application of SAFe in organizations.\n",
// "Contenidos": "Introduction to SAFe\n\nAgile Release Trains\n\nRoles and responsibilities\n\nValue delivery\n\nContinuous improvement",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Call-Centre-Associate-CCCA.jpg",
// "Certificaciones": "Certified Call Centre Associate (CCCA)",
// "Área": "CUSTOMER SERVICE",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Call center agents.\nProfessionals in telephone service.\nStudents interested in customer service.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to handle calls effectively, listening and resolving problems.",
// "Objetivo general": "Improve skills in telephone handling and customer service.",
// "Objetivos específicos": "Recognize listening and communication techniques.\nExplore problem resolution strategies.\nEvaluate ethical interactions in call centers.\n",
// "Contenidos": "Telephone communication techniques\n\nActive listening\n\nProblem resolution\n\nHandling difficult customers\n\nService improvement",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "15 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "Unlimited attempts",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/customer-service-prof-course.png",
// "Certificaciones": "Certified Customer Service Professional (CCSP)",
// "Área": "CUSTOMER SERVICE",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in customer service.\nCustomer service managers.\nStudents in support roles.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to handle service interactions, resolving conflicts and understanding needs.",
// "Objetivo general": "Equip with effective techniques for customer handling.",
// "Objetivos específicos": "Recognize customer service principles.\nExplore interaction handling.\nEvaluate conflict resolution ethically.\n",
// "Contenidos": "Service principles\n\nInteraction handling\n\nConflict resolution\n\nContinuous improvement\n\nBest practices",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "15 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Data-Centre-Professional-CDCP.jpg",
// "Certificaciones": "Certified Data Centre Professional (CDCP)",
// "Área": "DATA CENTER MANAGEMENT",
// "Ente Certificador": "GAQM / EPI",
// "Dirigido a / Perfil de entrada": "Professionals in data center infrastructure.\nIT operations managers.\nStudents in data center management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to understand key data center components and their management.",
// "Objetivo general": "Provide knowledge on critical infrastructure in data centers.",
// "Objetivos específicos": "Recognize data center components.\nExplore design and operations.\nEvaluate ethical and responsible maintenance.\n",
// "Contenidos": "Data center components\n\nDesign and construction\n\nMaintenance and operations\n\nSecurity and compliance\n\nEnergy efficiency",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-General-Manager-CGM.webp",
// "Certificaciones": "Certified General Manager (CGM)",
// "Área": "GENERAL MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Mid-level managers in various industries.\nProfessionals seeking to improve leadership.\nStudents in management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to motivate teams, manage projects, and analyze financial situations.",
// "Objetivo general": "Improve effectiveness and leadership in general management.",
// "Objetivos específicos": "Recognize systematic approaches to objectives.\nExplore motivation and team building.\nEvaluate financial analysis and risks.\n",
// "Contenidos": "Strategic management\n\nTeam motivation\n\nProject management\n\nFinancial analysis\n\nRisk assessment",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Sports-Manager-CSM.jpg",
// "Certificaciones": "Certified Sports Manager (CSM)",
// "Área": "SPORTS MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in sports management.\nClub and sports school managers.\nStudents in sports administration.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage sports operations in institutions.",
// "Objetivo general": "Develop competencies for management in the sports sector.",
// "Objetivos específicos": "Recognize sports management principles.\nExplore operations in clubs and schools.\nEvaluate ethical strategies in sports.\n",
// "Contenidos": "Sports management principles\n\nOperations in institutions\n\nSports marketing\n\nSports finances\n\nTeam leadership",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Become-a-Certified-Human-Resource-Manager.webp",
// "Certificaciones": "Certified Human Resources Manager (CHRM)",
// "Área": "HUMAN RESOURCES MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "HR professionals.\nTalent managers.\nStudents in human resources.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to perform HR functions, from recruitment to development.",
// "Objetivo general": "Equip with skills for human resources functions.",
// "Objetivos específicos": "Recognize recruitment processes.\nExplore talent development.\nEvaluate ethical employee management.\n",
// "Contenidos": "Hiring process\n\nTalent management\n\nOrganizational development\n\nLabor relations\n\nPerformance evaluation",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Real-Estate-Manager-CREM.jpg",
// "Certificaciones": "Certified Real Estate Manager (CREM)",
// "Área": "REAL ESTATE MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in real estate sector.\nProperty managers.\nStudents in real estate.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to operate efficiently in the real estate sector.",
// "Objetivo general": "Equip to operate in the real estate sector.",
// "Objetivos específicos": "Recognize real estate strategies.\nExplore property management.\nEvaluate ethical operations in real estate.\n",
// "Contenidos": "Real estate strategies\n\nProperty management\n\nReal estate finances\n\nReal estate marketing\n\nLegal aspects",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/cyberiuminfotech-21032023125652Untitled design (79).jpg",
// "Certificaciones": "Certified Data Protection and Privacy Manager (CDPPM)",
// "Área": "DATA PROTECTION",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in data security.\nPrivacy managers.\nStudents in cybersecurity.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to protect personal data using international standards.",
// "Objetivo general": "Teach to protect data and privacy with global standards.",
// "Objetivos específicos": "Recognize security and privacy standards.\nExplore data laws.\nEvaluate ethical privacy management.\n",
// "Contenidos": "Security standards\n\nPrivacy laws\n\nData management\n\nRegulatory compliance\n\nPrivacy audits",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Information-Technology-Manager-CITM.jpg",
// "Certificaciones": "Certified Information Technology Manager (CITM)",
// "Área": "IT MANAGEMENT",
// "Ente Certificador": "GAQM / EPI",
// "Dirigido a / Perfil de entrada": "Senior IT professionals.\nIT team leaders.\nStudents with IT experience.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage IT at senior levels, including projects and personnel.",
// "Objetivo general": "Teach competencies for IT specialists at senior levels.",
// "Objetivos específicos": "Recognize corporate frameworks in IT.\nExplore software and personnel management.\nEvaluate IT projects ethically.\n",
// "Contenidos": "Corporate frameworks\n\nSoftware management\n\nPersonnel management\n\nIT projects\n\nManagement services",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "24 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Risk-and-Crisis-Manager.jpg",
// "Certificaciones": "Certified Risk and Crisis Manager (CRCM)",
// "Área": "RISK AND CRISIS MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in risk management.\nCrisis managers.\nStudents in risk management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to identify risks and handle crises.",
// "Objetivo general": "Provide tools for risk and crisis management.",
// "Objetivos específicos": "Recognize risk identification.\nExplore crisis response.\nEvaluate ethical strategies.\n",
// "Contenidos": "Risk identification\n\nCrisis handling\n\nMitigation strategies\n\nContinuity planning\n\nPost-crisis evaluation",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Lean-IT-Foundation.jpg",
// "Certificaciones": "Lean IT Foundation",
// "Área": "LEAN IT MANAGEMENT",
// "Ente Certificador": "GAQM / PeopleCert",
// "Dirigido a / Perfil de entrada": "IT professionals seeking efficiency.\nIT service managers.\nStudents in lean management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to support lean strategies in IT organizations.",
// "Objetivo general": "Provide basic knowledge for lean strategies in IT.",
// "Objetivos específicos": "Recognize lean principles in IT.\nExplore waste elimination.\nEvaluate value for the customer.\n",
// "Contenidos": "Lean principles\n\nValue for the customer\n\nWaste elimination\n\nContinuous improvement\n\nApplication in IT",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Change-Manager-–-Foundation-CCMF.jpg",
// "Certificaciones": "Certified Quality Manager (CQM)",
// "Área": "QUALITY MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Quality professionals.\nQuality managers.\nStudents in quality management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to motivate staff and manage quality projects.",
// "Objetivo general": "Improve skills in quality management.",
// "Objetivos específicos": "Recognize quality systems.\nExplore financial analysis in quality.\nEvaluate continuous improvement ethically.\n",
// "Contenidos": "Quality systems\n\nQuality leadership\n\nFinancial analysis\n\nProject management\n\nContinuous improvement",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Finance-Manager-CFM.jpg",
// "Certificaciones": "Certified Finance Manager (CFM)",
// "Área": "FINANCIAL MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Finance professionals.\nFinancial managers.\nStudents in finance.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to plan and optimize financial performance.",
// "Objetivo general": "Improve capabilities in financial management.",
// "Objetivos específicos": "Recognize financial planning.\nExplore financial control.\nEvaluate ethical optimization.\n",
// "Contenidos": "Financial planning\n\nControl and optimization\n\nPerformance analysis\n\nRisk management\n\nSustainable strategies",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/cpam.jpg",
// "Certificaciones": "Certified Professional Accountant Manager (CPAM)",
// "Área": "ACCOUNTING AND MANAGEMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Accountants and financial managers.\nProfessionals in financial services.\nStudents in accounting.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to handle finances and accounting in managerial roles.",
// "Objetivo general": "Validate skills in managerial accounting.",
// "Objetivos específicos": "Recognize accounting principles.\nExplore financial management.\nEvaluate ethical compliance.\n",
// "Contenidos": "Accounting principles\n\nFinancial management\n\nAuditing\n\nTaxes\n\nFinancial reports",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "Unlimited attempts",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Global-Tax-Practitioner-CGTP.jpg",
// "Certificaciones": "Certified Global Tax Practitioner (CGTP)",
// "Área": "GLOBAL TAXES",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Tax professionals.\nAccountants and tax lawyers.\nStudents in tax management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to handle global taxes and international treaties.",
// "Objetivo general": "Provide knowledge in international taxes.",
// "Objetivos específicos": "Recognize global tax policies.\nExplore double taxation treaties.\nEvaluate ethical compliance in taxes.\n",
// "Contenidos": "International tax policies\n\nDouble taxation treaties\n\nTransfer pricing\n\nRegulatory compliance\n\nTax planning",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Sales-Marketing-Professional-Course-CSMP.jpg",
// "Certificaciones": "Certified Sales and Marketing Professional (CSMP)",
// "Área": "SALES AND MARKETING",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in sales and marketing.\nMarketing managers.\nStudents in business.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement low-cost sales and marketing strategies.",
// "Objetivo general": "Teach effective sales and marketing strategies.",
// "Objetivos específicos": "Recognize maximum exposure at low cost.\nExplore sales strategies.\nEvaluate ethical marketing.\n",
// "Contenidos": "Marketing strategies\n\nSales techniques\n\nLow-cost exposure\n\nMarket analysis\n\nSales improvement",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "8 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/177d4a046ee40.png",
// "Certificaciones": "Certified Digital Marketing Professional (CDMP)",
// "Área": "DIGITAL MARKETING",
// "Ente Certificador": "GAQM / DMI",
// "Dirigido a / Perfil de entrada": "Professionals in digital marketing.\nDigital campaign managers.\nStudents in digital marketing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement digital strategies, including SEO and social media.",
// "Objetivo general": "Provide skills in key digital marketing disciplines.",
// "Objetivos específicos": "Recognize AI in marketing.\nExplore SEO and PPC.\nEvaluate ethical content marketing.\n",
// "Contenidos": "Digital strategies\n\nSEO and PPC\n\nSocial media\n\nContent marketing\n\nDigital analysis",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "30 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/LPI_Logo-_Colour-1024x449.jpg",
// "Certificaciones": "Linux Certified Professional (LCP)",
// "Área": "LINUX SYSTEMS",
// "Ente Certificador": "GAQM / LPI",
// "Dirigido a / Perfil de entrada": "Linux developers and administrators.\nProfessionals in open source systems.\nStudents in Linux.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to capitalize on opportunities in Linux.",
// "Objetivo general": "Validate knowledge in Linux administration.",
// "Objetivos específicos": "Recognize Linux architecture.\nExplore installation and distributions.\nEvaluate ethical use of Linux.\n",
// "Contenidos": "Linux architecture\n\nInstallation and distributions\n\nSystem administration\n\nSecurity\n\nScripting",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/1_FrEzRbciYFMQXLLyg6k-cg.jpg",
// "Certificaciones": "Certified User Experience (UX) Designer (CUED)",
// "Área": "UX DESIGN",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in UX design.\nApp and website designers.\nStudents in user experience.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to create effective interactions in digital products.",
// "Objetivo general": "Teach about user interactions with products.",
// "Objetivos específicos": "Recognize UX principles.\nExplore interface design.\nEvaluate ethical usability.\n",
// "Contenidos": "UX principles\n\nInterface design\n\nUsability\n\nUser research\n\nPrototyping",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/iso-20000.png",
// "Certificaciones": "ISO 20000 - ITSM Certificate",
// "Área": "IT SERVICE MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Professionals in ITSM.\nIT service managers.\nStudents in IT management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to understand basic ITSM concepts according to ISO 20000.",
// "Objetivo general": "Introduce principles of IT service management.",
// "Objetivos específicos": "Recognize ISO 20000 requirements.\nExplore ITSM processes.\nEvaluate ethical implementation.\n",
// "Contenidos": "ISO 20000 requirements\n\nITSM processes\n\nService improvement\n\nInternal auditing\n\nCertification",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00198.png",
// "Certificaciones": "ISO 27001:2022 ISMS - Certified Internal Auditor",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Internal auditors in ISMS.\nInformation security professionals.\nStudents in auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to perform internal audits according to ISO 27001:2022.",
// "Objetivo general": "Train in internal audits for ISMS.",
// "Objetivos específicos": "Recognize auditing standards.\nExplore audit planning.\nEvaluate ethical conformity.\n",
// "Contenidos": "Auditing principles\n\nAudit planning\n\nAudit execution\n\nReports\n\nFollow-up",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "24 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/iso-27001-auditor-1024x576.jpg",
// "Certificaciones": "ISO 27001 : 2013 - Certified Lead Auditor",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in ISMS.\nProfessionals with security experience.\nAdvanced students in auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of ISMS according to ISO 27001:2013.",
// "Objetivo general": "Prepare to lead ISMS certification audits.",
// "Objetivos específicos": "Recognize auditing norms.\nExplore audit program management.\nEvaluate auditor competence.\n",
// "Contenidos": "Auditing norms\n\nProgram management\n\nCertification audits\n\nAuditor competence\n\nEvaluation",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00324.png",
// "Certificaciones": "ISO/IEC 38500 - Lead IT Corporate Governance Manager",
// "Área": "IT GOVERNANCE",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "IT governance managers.\nIT corporate governance professionals.\nStudents in IT management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage corporate governance in IT according to ISO/IEC 38500.",
// "Objetivo general": "Teach effective IT governance.",
// "Objetivos específicos": "Recognize IT governance principles.\nExplore evaluation and direction.\nEvaluate ethical monitoring.\n",
// "Contenidos": "IT governance principles\n\nPerformance evaluation\n\nStrategic direction\n\nMonitoring\n\nCompliance",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00165.png",
// "Certificaciones": "ISO 22301 BCMS - Certified Lead Auditor",
// "Área": "BUSINESS CONTINUITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in business continuity.\nBCMS professionals.\nStudents in continuity auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of BCMS according to ISO 22301.",
// "Objetivo general": "Prepare for audits of business continuity systems.",
// "Objetivos específicos": "Recognize BCMS standards.\nExplore audit planning.\nEvaluate conformity.\n",
// "Contenidos": "Continuity standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_9795.png",
// "Certificaciones": "ISO 50001 : 2018 - Certified Lead Auditor",
// "Área": "ENERGY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in energy management.\nEnMS professionals.\nStudents in energy auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of EnMS according to ISO 50001:2018.",
// "Objetivo general": "Train in audits for energy management systems.",
// "Objetivos específicos": "Recognize ISO 50001 requirements.\nExplore energy audits.\nEvaluate ethical efficiency.\n",
// "Contenidos": "EnMS requirements\n\nEnergy audits\n\nPlanning\n\nExecution\n\nCertification",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_6848.png",
// "Certificaciones": "ISO 9001 : 2015 - Certified Internal Auditor",
// "Área": "QUALITY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Internal auditors in QMS.\nQuality professionals.\nStudents in quality auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to perform internal audits according to ISO 9001:2015.",
// "Objetivo general": "Train in internal audits for QMS.",
// "Objetivos específicos": "Recognize auditing principles.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "Auditing principles\n\nPlanning\n\nExecution\n\nReports\n\nFollow-up",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "24 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00372.png",
// "Certificaciones": "ISO 9001 Lead Implementer",
// "Área": "QUALITY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "QMS implementers.\nQuality managers.\nStudents in standard implementation.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement QMS according to ISO 9001.",
// "Objetivo general": "Teach implementation of quality management systems.",
// "Objetivos específicos": "Recognize ISO 9001 requirements.\nExplore implementation planning.\nEvaluate ethical monitoring.\n",
// "Contenidos": "QMS requirements\n\nPlanning\n\nImplementation\n\nMonitoring\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_9700.png",
// "Certificaciones": "ISO 9001 : 2018 - Certified Lead Auditor",
// "Área": "QUALITY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in QMS.\nProfessionals with experience.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of QMS according to ISO 9001:2018.",
// "Objetivo general": "Prepare to lead certification audits QMS.",
// "Objetivos específicos": "Recognize auditing norms.\nExplore program management.\nEvaluate competence.\n",
// "Contenidos": "Auditing norms\n\nProgram management\n\nCertification audits\n\nCompetence\n\nEvaluation",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/ISO-20000.webp",
// "Certificaciones": "ISO / IEC 20000 ITSM - Foundation Certificate",
// "Área": "IT SERVICE MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Beginner professionals in ITSM.\nInterested in IT services.\nStudents in IT.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to understand basic ITSM concepts according to ISO/IEC 20000.",
// "Objetivo general": "Introduce fundamentals of IT service management.",
// "Objetivos específicos": "Recognize ITSM terminology.\nExplore ISO 20000 structure.\nEvaluate basic concepts.\n",
// "Contenidos": "ITSM terminology\n\nISO 20000 structure\n\nBasic concepts\n\nProcesses\n\nCertification",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00206.png",
// "Certificaciones": "ISO / IEC 27002 Foundation",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Beginner professionals in information security.\nInterested in security controls.\nStudents in cybersecurity.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to understand security controls according to ISO/IEC 27002.",
// "Objetivo general": "Introduce fundamentals of information security controls.",
// "Objetivos específicos": "Recognize security controls.\nExplore implementation.\nEvaluate ethical application.\n",
// "Contenidos": "Security controls\n\nImplementation\n\nBest practices\n\nCompliance\n\nAuditing",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_5449.png",
// "Certificaciones": "ISO/IEC 27001:2022 - Certified Lead Implementer",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "ISMS implementers.\nSecurity managers.\nStudents in implementation.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement ISMS according to ISO/IEC 27001:2022.",
// "Objetivo general": "Teach implementation of information security management systems.",
// "Objetivos específicos": "Recognize ISO 27001 requirements.\nExplore planning.\nEvaluate monitoring.\n",
// "Contenidos": "ISMS requirements\n\nPlanning\n\nImplementation\n\nMonitoring\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/iso-27001-auditor-firebrand.png",
// "Certificaciones": "ISO/IEC 27001-27002 - Lead Auditor",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in ISMS.\nExperienced professionals.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit ISMS according to ISO/IEC 27001 and 27002.",
// "Objetivo general": "Prepare for combined audits of ISMS and controls.",
// "Objetivos específicos": "Recognize integration of standards.\nExplore combined audits.\nEvaluate controls.\n",
// "Contenidos": "27001 and 27002 integration\n\nCombined audits\n\nSecurity controls\n\nReports\n\nCertification",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_194.png",
// "Certificaciones": "ISO 9001 : 2015 - Certified Lead Auditor",
// "Área": "QUALITY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in QMS.\nProfessionals with experience.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of QMS according to ISO 9001:2015.",
// "Objetivo general": "Prepare to lead quality audits.",
// "Objetivos específicos": "Recognize auditing norms.\nExplore program management.\nEvaluate competence.\n",
// "Contenidos": "Auditing norms\n\nProgram management\n\nCertification audits\n\nCompetence\n\nEvaluation",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_5157.png",
// "Certificaciones": "ISO/IEC 27001:2022 - Certified Lead Auditor",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in ISMS.\nExperienced professionals.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of ISMS according to ISO/IEC 27001:2022.",
// "Objetivo general": "Prepare for certification audits ISMS updated.",
// "Objetivos específicos": "Recognize ISO 27001:2022 updates.\nExplore audit management.\nEvaluate controls.\n",
// "Contenidos": "ISO 27001 updates\n\nAudit management\n\nSecurity controls\n\nReports\n\nCertification",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_7450.png",
// "Certificaciones": "ISO 27001 : 2013 ISMS - Foundation",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Beginner professionals in ISMS.\nInterested in information security.\nStudents in IT.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to understand basic ISMS concepts according to ISO 27001:2013.",
// "Objetivo general": "Introduce fundamentals of information security management.",
// "Objetivos específicos": "Recognize ISMS terminology.\nExplore ISO 27001 structure.\nEvaluate basic concepts.\n",
// "Contenidos": "ISMS terminology\n\nISO 27001 structure\n\nBasic concepts\n\nControls\n\nCertification",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_7291.png",
// "Certificaciones": "ISO/IEC 27031:2011 - Lead Implementer",
// "Área": "IT CONTINUITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "IT continuity implementers.\nIT managers.\nStudents in continuity.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement IT continuity according to ISO/IEC 27031:2011.",
// "Objetivo general": "Teach implementation of continuity in IT.",
// "Objetivos específicos": "Recognize IT continuity requirements.\nExplore planning.\nEvaluate monitoring.\n",
// "Contenidos": "IT continuity requirements\n\nPlanning\n\nImplementation\n\nMonitoring\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_473.jpg",
// "Certificaciones": "ISO 14001 - Certified Lead Auditor",
// "Área": "ENVIRONMENTAL MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in EMS.\nEnvironmental professionals.\nStudents in environmental auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of EMS according to ISO 14001.",
// "Objetivo general": "Prepare for audits of environmental management systems.",
// "Objetivos específicos": "Recognize environmental standards.\nExplore audit planning.\nEvaluate conformity.\n",
// "Contenidos": "Environmental standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/twitter_thumb_201604_00287.png",
// "Certificaciones": "ISO 31000 - Certified Lead Risk Manager",
// "Área": "RISK MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Risk managers.\nRisk management professionals.\nStudents in risk management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage risks according to ISO 31000.",
// "Objetivo general": "Teach enterprise risk management.",
// "Objetivos específicos": "Recognize risk principles.\nExplore evaluation.\nEvaluate ethical treatment.\n",
// "Contenidos": "Risk principles\n\nEvaluation\n\nTreatment\n\nMonitoring\n\nCommunication",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_9202.png",
// "Certificaciones": "ISO/IEC 20000-1:2018 - Certified Lead Auditor",
// "Área": "IT SERVICE MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in ITSM.\nIT services professionals.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of ITSM according to ISO/IEC 20000-1:2018.",
// "Objetivo general": "Prepare for audits of IT service management.",
// "Objetivos específicos": "Recognize ISO 20000 requirements.\nExplore service audits.\nEvaluate conformity.\n",
// "Contenidos": "ITSM requirements\n\nAudit planning\n\nExecution\n\nReports\n\nCertification",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_6751.png",
// "Certificaciones": "ISO/IEC 27701 - Certified Lead Auditor",
// "Área": "PRIVACY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in PIMS.\nPrivacy professionals.\nStudents in data auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit PIMS according to ISO/IEC 27701.",
// "Objetivo general": "Train in audits of privacy information management.",
// "Objetivos específicos": "Recognize privacy standards.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "PIMS standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_9514.jpg",
// "Certificaciones": "ISO 26262 - Certified Internal Auditor",
// "Área": "AUTOMOTIVE FUNCTIONAL SAFETY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Internal auditors in automotive.\nFunctional safety professionals.\nStudents in automotive auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to perform internal audits according to ISO 26262.",
// "Objetivo general": "Train in audits for functional safety in automobiles.",
// "Objetivos específicos": "Recognize functional safety standards.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 26262 standards\n\nAudit planning\n\nExecution\n\nReports\n\nFollow-up",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "24 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/iso10.jpg",
// "Certificaciones": "ISO 37001:2016 - Certified Lead Auditor",
// "Área": "ANTI-BRIBERY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in ABMS.\nAnti-corruption professionals.\nStudents in anti-bribery auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of ABMS according to ISO 37001:2016.",
// "Objetivo general": "Prepare for audits of anti-bribery systems.",
// "Objetivos específicos": "Recognize anti-bribery requirements.\nExplore audit planning.\nEvaluate conformity.\n",
// "Contenidos": "ABMS requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00217.png",
// "Certificaciones": "ISO/IEC 27032 - Lead Cyber Security Manager",
// "Área": "CYBERSECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Cybersecurity managers.\nCyber security professionals.\nStudents in cybersecurity management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage cybersecurity according to ISO/IEC 27032.",
// "Objetivo general": "Teach cybersecurity management.",
// "Objetivos específicos": "Recognize cyber security principles.\nExplore controls.\nEvaluate incident response.\n",
// "Contenidos": "Cybersecurity principles\n\nControls\n\nIncident response\n\nMonitoring\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_6693.png",
// "Certificaciones": "ISO 45001:2018 OHSMS - Certified Lead Auditor",
// "Área": "OCCUPATIONAL HEALTH AND SAFETY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in OHSMS.\nOccupational health professionals.\nStudents in OHS auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of OHSMS according to ISO 45001:2018.",
// "Objetivo general": "Prepare for audits of occupational health and safety systems.",
// "Objetivos específicos": "Recognize OHSMS requirements.\nExplore audit planning.\nEvaluate conformity.\n",
// "Contenidos": "OHSMS requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_1331.png",
// "Certificaciones": "ISO 22000:2018 - Certified Lead Auditor",
// "Área": "FOOD SAFETY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in FSMS.\nFood safety professionals.\nStudents in food auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of FSMS according to ISO 22000:2018.",
// "Objetivo general": "Prepare for audits of food safety management systems.",
// "Objetivos específicos": "Recognize FSMS requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "FSMS requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_7061.png",
// "Certificaciones": "ISO 13485:2016 - Certified Lead Auditor",
// "Área": "MEDICAL DEVICES MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in MDMS.\nMedical devices professionals.\nStudents in medical auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of MDMS according to ISO 13485:2016.",
// "Objetivo general": "Prepare for audits of medical devices management systems.",
// "Objetivos específicos": "Recognize MDMS requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "MDMS requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_1950.png",
// "Certificaciones": "ISO 27019:2017 - Certified Lead Auditor",
// "Área": "ENERGY SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in energy security.\nUtilities professionals.\nStudents in energy auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit security in energy systems according to ISO 27019:2017.",
// "Objetivo general": "Train in audits for security in energy sector.",
// "Objetivos específicos": "Recognize controls for energy.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "Controls for energy\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_5069.png",
// "Certificaciones": "ISO 41001:2018 - Certified Lead Auditor",
// "Área": "FACILITIES MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in FM.\nFacilities managers.\nStudents in facilities auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of FMS according to ISO 41001:2018.",
// "Objetivo general": "Prepare for audits of facilities management systems.",
// "Objetivos específicos": "Recognize FM requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "FMS requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_3193.png",
// "Certificaciones": "ISO 21500 - Certified Lead Project Manager",
// "Área": "PROJECT MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead project managers.\nProject management professionals.\nStudents in project management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead projects according to ISO 21500.",
// "Objetivo general": "Teach project management according to international standards.",
// "Objetivos específicos": "Recognize project principles.\nExplore planning.\nEvaluate ethical execution.\n",
// "Contenidos": "Project principles\n\nPlanning\n\nExecution\n\nControl\n\nClosure",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_630.png",
// "Certificaciones": "ISO/IEC 19770 - Certified Lead Auditor",
// "Área": "SOFTWARE ASSET MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in SAM.\nSoftware asset professionals.\nStudents in IT auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit SAM according to ISO/IEC 19770.",
// "Objetivo general": "Train in audits for software asset management.",
// "Objetivos específicos": "Recognize SAM standards.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "SAM standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_5983.png",
// "Certificaciones": "ISO/IEC 17025 - Certified Lead Auditor",
// "Área": "LABORATORY MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in laboratories.\nAccreditation professionals.\nStudents in lab auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of laboratories according to ISO/IEC 17025.",
// "Objetivo general": "Prepare for audits of laboratory competence.",
// "Objetivos específicos": "Recognize lab requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 17025 requirements\n\nAudit planning\n\nExecution\n\nReports\n\nAccreditation",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_4629.png",
// "Certificaciones": "ISO/IEC 27017:2015 - Certified Lead Auditor",
// "Área": "CLOUD SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in cloud security.\nCloud service professionals.\nStudents in cloud auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit cloud security according to ISO/IEC 27017:2015.",
// "Objetivo general": "Train in audits for security in cloud services.",
// "Objetivos específicos": "Recognize controls for cloud.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "Controls for cloud\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_1607.png",
// "Certificaciones": "ISO/IEC 17020:2012 - Certified Lead Auditor",
// "Área": "INSPECTION",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in inspection bodies.\nInspection professionals.\nStudents in inspection auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit inspection bodies according to ISO/IEC 17020:2012.",
// "Objetivo general": "Prepare for audits of inspection organizations.",
// "Objetivos específicos": "Recognize inspection requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 17020 requirements\n\nAudit planning\n\nExecution\n\nReports\n\nAccreditation",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_1801.png",
// "Certificaciones": "ISO 37301 - Certified Lead Auditor",
// "Área": "COMPLIANCE MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in CMS.\nCompliance professionals.\nStudents in compliance auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit CMS according to ISO 37301.",
// "Objetivo general": "Train in audits for compliance management systems.",
// "Objetivos específicos": "Recognize compliance standards.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "CMS standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_9639.png",
// "Certificaciones": "ISO 26000 - Certified Lead Auditor",
// "Área": "SOCIAL RESPONSIBILITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in social responsibility.\nCSR professionals.\nStudents in social auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit social responsibility according to ISO 26000.",
// "Objetivo general": "Prepare for audits of social responsibility.",
// "Objetivos específicos": "Recognize CSR principles.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 26000 principles\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00256.png",
// "Certificaciones": "ISO 28000 - Certified Lead Auditor",
// "Área": "SUPPLY CHAIN MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in SCM.\nSupply chain professionals.\nStudents in supply chain auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit SCM according to ISO 28000.",
// "Objetivo general": "Train in audits for supply chain management.",
// "Objetivos específicos": "Recognize SCM standards.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 28000 standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00362.png",
// "Certificaciones": "ISO 21434:2021 - Certified Lead Auditor",
// "Área": "AUTOMOTIVE CYBERSECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in automotive cybersecurity.\nConnected vehicles professionals.\nStudents in automotive auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit automotive cybersecurity according to ISO 21434:2021.",
// "Objetivo general": "Prepare for audits of cybersecurity in vehicles.",
// "Objetivos específicos": "Recognize automotive cybersecurity standards.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 21434 standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_1091.png",
// "Certificaciones": "ISO 55001 - Certified Lead Auditor",
// "Área": "ASSET MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in AMS.\nAsset management professionals.\nStudents in asset auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit AMS according to ISO 55001.",
// "Objetivo general": "Train in audits for asset management systems.",
// "Objetivos específicos": "Recognize AMS requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 55001 requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_3691.png",
// "Certificaciones": "ISO 19011 - Certified Lead Auditor",
// "Área": "MANAGEMENT SYSTEMS AUDITING",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in management systems.\nGeneral auditing professionals.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits according to ISO 19011.",
// "Objetivo general": "Prepare for audits of management systems.",
// "Objetivos específicos": "Recognize auditing principles.\nExplore audit programs.\nEvaluate competence.\n",
// "Contenidos": "Auditing principles\n\nAudit programs\n\nExecution\n\nCompetence\n\nEvaluation",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_6254.png",
// "Certificaciones": "ISO/IEC 27000 - Certified Lead Auditor",
// "Área": "INFORMATION SECURITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in 27000 family.\nSecurity professionals.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit according to ISO/IEC 27000 family.",
// "Objetivo general": "Train in audits for security standards family.",
// "Objetivos específicos": "Recognize 27000 family.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 27000 family\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00261.png",
// "Certificaciones": "ISO/TS 29001 - Certified Lead Auditor",
// "Área": "QUALITY MANAGEMENT IN PETROLEUM",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in petroleum industry.\nQMS professionals for petroleum.\nStudents in petroleum auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit QMS in petroleum according to ISO/TS 29001.",
// "Objetivo general": "Prepare for audits in petroleum sector.",
// "Objetivos específicos": "Recognize requirements for petroleum.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO/TS 29001 requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/twitter_thumb_201604_00287.png",
// "Certificaciones": "ISO/IEC 27005 - Certified Lead Risk Manager",
// "Área": "INFORMATION RISK MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Information risk managers.\nSecurity risk professionals.\nStudents in IT risk management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage risks in information according to ISO/IEC 27005.",
// "Objetivo general": "Teach risk management in information security.",
// "Objetivos específicos": "Recognize risk processes.\nExplore evaluation.\nEvaluate treatment.\n",
// "Contenidos": "Risk processes\n\nEvaluation\n\nTreatment\n\nMonitoring\n\nCommunication",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/blob.png",
// "Certificaciones": "ISO/IEC 42001 - Certified Lead Implementer",
// "Área": "ARTIFICIAL INTELLIGENCE MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "AIMS implementers.\nAI professionals.\nStudents in AI management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement AIMS according to ISO/IEC 42001.",
// "Objetivo general": "Teach implementation of AI management systems.",
// "Objetivos específicos": "Recognize AIMS requirements.\nExplore planning.\nEvaluate monitoring.\n",
// "Contenidos": "ISO 42001 requirements\n\nPlanning\n\nImplementation\n\nMonitoring\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/blob (1).png",
// "Certificaciones": "ISO/IEC 42001 - Certified Lead Auditor",
// "Área": "ARTIFICIAL INTELLIGENCE MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Lead auditors in AIMS.\nAI audit professionals.\nAdvanced students.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to lead audits of AIMS according to ISO/IEC 42001.",
// "Objetivo general": "Prepare for audits of AI management systems.",
// "Objetivos específicos": "Recognize AI standards.\nExplore audit planning.\nEvaluate conformity.\n",
// "Contenidos": "AIMS standards\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/00310.png",
// "Certificaciones": "ISO 37101 - Certified Lead Auditor",
// "Área": "SUSTAINABLE COMMUNITIES MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in community sustainability.\nSustainable development professionals.\nStudents in sustainable auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit sustainable communities according to ISO 37101.",
// "Objetivo general": "Train in audits for sustainable communities management.",
// "Objetivos específicos": "Recognize sustainability requirements.\nExplore planning.\nEvaluate conformity.\n",
// "Contenidos": "ISO 37101 requirements\n\nAudit planning\n\nExecution\n\nReports\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/jwapm5fuf02hl3wffip3r0dyzr8a.avif",
// "Certificaciones": "ISO 22301:2019 BCMS - Certified Lead Implementer",
// "Área": "BUSINESS CONTINUITY",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "BCMS implementers.\nContinuity managers.\nStudents in continuity implementation.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to implement BCMS according to ISO 22301:2019.",
// "Objetivo general": "Teach implementation of business continuity systems.",
// "Objetivos específicos": "Recognize BCMS requirements.\nExplore planning.\nEvaluate monitoring.\n",
// "Contenidos": "ISO 22301 requirements\n\nPlanning\n\nImplementation\n\nMonitoring\n\nImprovement",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "32 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_14.png",
// "Certificaciones": "IEC 62443 Cybersecurity Certificate",
// "Área": "INDUSTRIAL CYBERSECURITY",
// "Ente Certificador": "ISA",
// "Dirigido a / Perfil de entrada": "Professionals in IACS.\nIndustrial cybersecurity engineers.\nStudents in OT security.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to handle cybersecurity in industrial control systems.",
// "Objetivo general": "Provide knowledge in cybersecurity for IACS.",
// "Objetivos específicos": "Recognize IACS lifecycle.\nExplore design and operations.\nEvaluate ethical maintenance.\n",
// "Contenidos": "IACS lifecycle\n\nDesign and implementation\n\nOperations\n\nMaintenance\n\nEvaluation",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "16 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_1419.png",
// "Certificaciones": "ISO 14971:2019 - Certified Lead Auditor",
// "Área": "MEDICAL RISK MANAGEMENT",
// "Ente Certificador": "PECB",
// "Dirigido a / Perfil de entrada": "Auditors in medical risks.\nMedical devices professionals.\nStudents in medical auditing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to audit risks in medical devices according to ISO 14971:2019.",
// "Objetivo general": "Train in audits for risk management in medical devices.",
// "Objetivos específicos": "Recognize medical risk processes.\nExplore evaluation.\nEvaluate treatment.\n",
// "Contenidos": "Risk processes\n\nEvaluation\n\nTreatment\n\nMonitoring\n\nReports",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "40 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_240.png",
// "Certificaciones": "Certified AI Testing Professional (CAITP)",
// "Área": "AI TESTING",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Professionals in AI testing.\nIntelligent systems testers.\nStudents in AI testing.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to test AI systems for functionality and ethics.",
// "Objetivo general": "Validate expertise in AI testing.",
// "Objetivos específicos": "Recognize AI model evaluation.\nExplore adversarial testing.\nEvaluate ethical explainability.\n",
// "Contenidos": "AI model evaluation\n\nAdversarial testing\n\nExplainability\n\nCompliance\n\nAI ethics",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/generic-bscn-four-year.jpg",
// "Certificaciones": "Certified Nursing Assistant (CNA)",
// "Área": "NURSING ASSISTANCE",
// "Ente Certificador": "GAQM / Local states",
// "Dirigido a / Perfil de entrada": "People interested in health care.\nNursing students.\nBeginner professionals in healthcare.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to provide basic care to patients in health settings.",
// "Objetivo general": "Train in vital role of nursing assistant.",
// "Objetivos específicos": "Recognize basic patient care.\nExplore nurse support.\nEvaluate ethics in care.\n",
// "Contenidos": "Basic care\n\nMedical support\n\nHealth ethics\n\nClinical procedures\n\nPatient communication",
// "Vigencia Certificación": "Varies by state",
// "Cantidad de horas de capacitación": "75 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/Certified-Healthcare-Facility-Manager.jpg",
// "Certificaciones": "Certified Health Facility Manager (CHFM)",
// "Área": "HEALTH FACILITIES MANAGEMENT",
// "Ente Certificador": "GAQM / AHA",
// "Dirigido a / Perfil de entrada": "Health facilities managers.\nHealthcare facilities professionals.\nStudents in health management.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to manage health facilities, including compliance and maintenance.",
// "Objetivo general": "Demonstrate mastery in essential domains of facilities management in health.",
// "Objetivos específicos": "Recognize compliance and design.\nExplore maintenance.\nEvaluate ethical operations.\n",
// "Contenidos": "Compliance\n\nDesign and construction\n\nMaintenance\n\nOperations\n\nSafety",
// "Vigencia Certificación": "3 years",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_7803.png",
// "Certificaciones": "Certified Web Developer (CWD)",
// "Área": "WEB DEVELOPMENT",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "Web developers.\nWeb programming professionals.\nStudents in web development.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to create basic web applications with HTML, CSS, and JavaScript.",
// "Objetivo general": "Validate competencies in basic web development.",
// "Objetivos específicos": "Recognize HTML, CSS, and JS.\nExplore web app creation.\nEvaluate ethical development.\n",
// "Contenidos": "HTML and CSS\n\nJavaScript\n\nBasic web applications\n\nResponsive design\n\nDebugging",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_9376.png",
// "Certificaciones": "Certified PHP Professional (CPP)",
// "Área": "PHP PROGRAMMING",
// "Ente Certificador": "GAQM",
// "Dirigido a / Perfil de entrada": "PHP professionals.\nBackend developers.\nStudents in PHP programming.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to develop PHP-based software.",
// "Objetivo general": "Validate knowledge in installation, use, and PHP syntax.",
// "Objetivos específicos": "Recognize PHP syntax.\nExplore software development.\nEvaluate ethical semantics.\n",
// "Contenidos": "PHP installation\n\nSyntax and semantics\n\nAdvanced use\n\nApp development\n\nSecurity",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_6523.png",
// "Certificaciones": "Certified Associate Python Programmer (CAPP)",
// "Área": "PYTHON PROGRAMMING",
// "Ente Certificador": "GAQM / Python Institute",
// "Dirigido a / Perfil de entrada": "Beginner Python programmers.\nDevelopment professionals.\nStudents in programming.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to perform intermediate-level coding tasks in Python.",
// "Objetivo general": "Validate knowledge in Python programming at associate level.",
// "Objetivos específicos": "Recognize Python syntax.\nExplore coding tasks.\nEvaluate ethical programming.\n",
// "Contenidos": "Python syntax\n\nData structures\n\nFunctions\n\nModules\n\nBasic OOP",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// },
// {
// "course_image":"assets/courses/logo_4374.png",
// "Certificaciones": "Certified Professional Python Programmer (CPPP)",
// "Área": "ADVANCED PYTHON PROGRAMMING",
// "Ente Certificador": "GAQM / Python Institute",
// "Dirigido a / Perfil de entrada": "Advanced Python programmers.\nSoftware professionals.\nAdvanced students in Python.\n",
// "Perfil de salida": "Upon completing the certification, the participant will be able to perform advanced programming tasks in Python.",
// "Objetivo general": "Validate advanced skills in Python programming.",
// "Objetivos específicos": "Recognize advanced OOP.\nExplore advanced modules.\nEvaluate ethical techniques.\n",
// "Contenidos": "Advanced OOP\n\nModules and packages\n\nExceptions\n\nMultithreading\n\nReal applications",
// "Vigencia Certificación": "Does not expire",
// "Cantidad de horas de capacitación": "20 hours",
// "Metodología (examen o proyecto)": "Exam",
// "Cantidad de intentos": "1 attempt with possibility of repetition",
// "Modalidad": "Live virtual modality"
// }
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
       
         <div className="relative h-38  bg-gray-100">
          <img 
            src={course.course_image}
            alt={course.Certificaciones}
            className="w-full h-full mt-0object-contain transition-transform duration-300 group-hover:scale-105"
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
    countryCode: '+92',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { t } = useLocalization();

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
    setSubmitError('');

    try {
      const response = await fetch('/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode}${formData.phoneNumber}`,
          course: courseName,
          technology: courseDetails?.technology || 'Not specified',
          category: courseDetails?.category || 'Not specified',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send inquiry');
      }

      console.log('Booking submitted:', { ...formData, phone: `${formData.countryCode}${formData.phoneNumber}`, course: courseName });
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
        setFormData({ fullName: '', email: '', countryCode: '+92', phoneNumber: '', message: '' });
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
      setFormData({ fullName: '', email: '', countryCode: '+92', phoneNumber: '', message: '' });
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
                <div className="flex space-x-2">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({...formData, countryCode: value})}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-[120px]">
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
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    placeholder="12345678"
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                </div>
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
    category: '',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const coursesPerPage = 12;
  const { t, language } = useLocalization();

  const coursesData = useMemo(() => {
    return language === 'en' ? COURSES_DATA_EN : COURSES_DATA;
  }, [language]);

  const filterOptions = useMemo(() => ({
    categories: [...new Set(coursesData.map(c => c["Área"]).filter(Boolean))],
  }), [coursesData]);

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesCategory = filters.category === 'all' || !filters.category || course["Área"] === filters.category;
      
      const matchesSearch = !filters.search || 
        // Search in course name (Certificaciones)
        course["Certificaciones"]?.toLowerCase().includes(filters.search.toLowerCase()) ||
        // Search in area
        course["Área"]?.toLowerCase().includes(filters.search.toLowerCase()) ||
        // Search in general objective
        course["Objetivo general"]?.toLowerCase().includes(filters.search.toLowerCase()) ||
        // Search in target profile
        course["Perfil de salida"]?.toLowerCase().includes(filters.search.toLowerCase()) ||
        // Search in contents
        course["Contenidos"]?.toLowerCase().includes(filters.search.toLowerCase()) ||
        // Search in certifier
        course["Ente Certificador"]?.toLowerCase().includes(filters.search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [coursesData, filters]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handleBookSeat = (courseName) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setFilters({ category: '', search: '' });
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {t('courseListingTitle')} {filteredCourses.length}
          </h1>
          <p className="text-gray-600">
            {t('courseListingDescription')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Redesigned Filter Section */}
        <Card className="p-6 mb-8 shadow-sm border">
          <div className="flex flex-col lg:flex-row items-end gap-4">
            {/* Search Filter - Now takes more space */}
            <div className="flex-1 w-full">
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                {t('searchCourses') || 'Search Courses'}
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('searchPlaceholder') || 'Search by course name, area, description...'}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                {t('category') || 'Category'}
              </Label>
              <Select 
                value={filters.category} 
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <SelectValue placeholder={t('selectCategory') || 'All Categories'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories') || 'All Categories'}</SelectItem>
                  {filterOptions.categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <Button 
              onClick={resetFilters}
              variant="outline"
              className="whitespace-nowrap border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('reset') || 'Reset'}
            </Button>
          </div>

          {/* Active Filters Display */}
          {(filters.category || filters.search) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.category && filters.category !== 'all' && (
                <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {filters.category}
                  <button 
                    onClick={() => handleFilterChange('category', '')}
                    className="hover:text-purple-900 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.search && (
                <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: "{filters.search}"
                  <button 
                    onClick={() => handleFilterChange('search', '')}
                    className="hover:text-blue-900 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {displayedCourses.length} of {filteredCourses.length} courses
            {filters.search && ` for "${filters.search}"`}
            {filters.category && filters.category !== 'all' && ` in ${filters.category}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course, index) => (
              <CourseCard 
                key={index} 
                course={course}
                onBookSeat={handleBookSeat}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                onClick={resetFilters}
                variant="outline"
                className="mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {totalPages > 1 && displayedCourses.length > 0 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              {t('prev') || 'Previous'}
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
              {t('next') || 'Next'}
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