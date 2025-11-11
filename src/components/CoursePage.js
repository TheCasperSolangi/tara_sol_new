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
import { Star, GraduationCap, Bookmark, CheckCircle2, X, CalendarCheck, Send, Search, Filter, ChevronDown, Play, Users, Clock, Award } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext';

// Course data - NOT TRANSLATED (preserved as requested)
const courseData = {
"Ruta de Competencias Digitales": {
      
        "Python": [

          {
              "course_image":"assets/courses/Python-Programming.jpg",
            "name": "Desarrollo de Modelos de Aprendizaje Automático con Python",
            "description": "Capacita a los estudiantes en la creación, entrenamiento y evaluación de modelos de aprendizaje automático con Python, abarcando clasificación, regresión y agrupación, optimización de modelos y selección de características.",
            "career": ["Ingeniería de Datos", "Científico de Datos", "Analista de Datos", "Desarrollador de Machine Learning"]
          },
          {
            "course_image":"assets/courses/how-is-python-used-in-finance.png",
            "name": "Analizar Datos Financieros con Python",
            "description": "Proporciona habilidades para análisis estadístico y modelado financiero con Python, usando Pandas y NumPy.",
            "career": ["Analista Financiero", "Analista de Riesgos", "Consultor Financiero", "Científico de Datos Financieros"]
          },
          {
            "course_image":"assets/courses/chatbot-4071274_1920.jpg",
            "name": "Desarrollo de Chatbots con Python",
            "description": "Cubre procesamiento de lenguaje natural (NLP) y desarrollo de chatbots con NLTK, spaCy, ChatterBot y Rasa.",
            "career": ["Desarrollador de Chatbots", "Ingeniero de Automatización de Conversaciones", "Especialista en Interfaz Conversacional"]
          },
          {
            "course_image":"assets/courses/1_XzIRJGujfqAiOV2EIQgR_Q.png",
            "name": "Construir Aplicaciones Web con Python y Flask",
            "description": "Desarrollo web con Flask, creación de rutas, formularios, bases de datos (SQLAlchemy) y APIs RESTful.",
            "career": ["Desarrollador Web", "Ingeniero de Software", "Desarrollador Backend"]
          },
          {
            "course_image":"assets/courses/1_E6jhcyx5k-18j5Aadq4FTg.png",
            "name": "Construir Modelos de Aprendizaje Profundo con Tensorflow",
            "description": "Implementación de redes neuronales, optimización de modelos y transferencia de aprendizaje con TensorFlow.",
            "career": ["Ingeniero de Machine Learning", "Científico de Datos", "Desarrollador de IA", "Investigador en Deep Learning"]
          },
          {
            "course_image":"assets/courses/natural-language-processing-nlp.png",
            "name": "Aplicar Procesamiento de Lenguaje Natural con Python",
            "description": "Aplicación de PLN en análisis de sentimientos, extracción de entidades y traducción automática con NLTK, spaCy y transformers.",
            "career": ["Ingeniero de PLN", "Desarrollador de Aplicaciones PLN", "Científico de Datos en PLN"]
          },
          {
            "course_image":"assets/courses/python-django-1024x576.webp",
            "name": "Construir Aplicaciones Web con Python y Django",
            "description": "Desarrollo web con Django, administración de modelos, autenticación y permisos.",
            "career": ["Desarrollador Full Stack", "Ingeniero de Software Web", "Arquitecto de Aplicaciones Web"]
          },
          {
            "course_image":"assets/courses/What-is-data-science-2.jpg",
            "name": "Ingeniería de Software para Científicos de Datos",
            "description": "Principios de ingeniería de software aplicados a proyectos de ciencia de datos, buenas prácticas y automatización.",
            "career": ["Ingeniero de Software para Ciencia de Datos", "Científico de Datos", "Ingeniero de Datos"]
          },
          {
            "course_image":"assets/courses/maxresdefault.jpg",
            "name": "Aprendizaje Automático",
            "description": "Cobertura de algoritmos supervisados y no supervisados, evaluación de modelos y aplicaciones prácticas.",
            "career": ["Científico de Datos", "Ingeniero de ML", "Analista de Datos"]
          },
          {
            "course_image":"assets/courses/1_ocaE5pTwxGuXKUhfalFuIw.jpg",
            "name": "Fundamentos de Aprendizaje Automático e Inteligencia Artificial",
            "description": "Introducción a ML e IA con conceptos de clasificación, regresión, agrupación y ética en IA.",
            "career": ["Estudiantes", "Principiantes en Ciencia de Datos", "Desarrolladores"]
          },
          {
            "course_image":"assets/courses/115972543-04513e80-a51d-11eb-8466-5f460b3cb1e0.png",
            "name": "Analizar y Visualizar Datos con Python",
            "description": "Uso de Pandas, Matplotlib y Seaborn para análisis y visualización, creación de dashboards.",
            "career": ["Analista de Datos", "Científico de Datos", "Consultor BI"]
          }
        ],
        "JavaScript": [
          {
            "course_image":"assets/courses/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_sk3vdofe7r7r5wax1scb.webp",
            "name": "Crear una Aplicación Web Avanzada con React y Redux",
            "description": "Desarrollo frontend avanzado con React y Redux, manejo de estado y componentes reutilizables.",
            "career": ["Desarrollador Frontend", "Ingeniero Web", "Especialista UI"]
          },
          {
            "course_image":"assets/courses/course_1674371266.jpg",
            "name": "Crear una Aplicación Front-End con React",
            "description": "Fundamentos de React, componentes, estado y arquitectura moderna para interfaces interactivas.",
            "career": ["Desarrollador Frontend", "Diseñador UI/UX"]
          },
          {
            "course_image":"assets/courses/Best-Backend-for-React-JS.webp",
            "name": "Crear una Aplicación Back-End con JavaScript",
            "description": "Desarrollo de servidores, rutas y bases de datos para aplicaciones full stack con JavaScript.",
            "career": ["Desarrollador Backend", "Arquitecto de Software", "Full Stack"]
          },
          {
            "course_image":"assets/courses/1623061726595_1.avif",
            "name": "Crear un Videojuego con Phaser.js",
            "description": "Diseño y desarrollo de juegos 2D interactivos con Phaser.js, optimización y lógica de juego.",
            "career": ["Desarrollador de Videojuegos", "Diseñador de Juegos"]
          }
        ],
        "HTML & CSS": [
          {
            "course_image":"assets/courses/67ff6ed197440c001def433d.jpg",
            "name": "Construir un Sitio Web con HTML, CSS y GitHub Pages",
            "description": "Creación de sitios web estáticos y hospedaje en GitHub Pages.",
            "career": ["Desarrollador Web", "Diseñador Web", "Especialista Frontend"]
          }
        ],
        "SQL": [
          {
            "course_image":"assets/courses/What_is_SQL_Database.png",
            "name": "Analizar Datos con SQL",
            "description": "Consultas, joins y operaciones de agregación en bases de datos relacionales.",
            "career": ["Analista de Datos", "Ingeniero de Datos"]
          },
          {
            "course_image":"assets/courses/PostgreSQL.jpg",
            "name": "Diseñar Bases de Datos con PostgreSQL",
            "description": "Modelado de datos, relaciones y optimización de consultas.",
            "career": ["Diseñador de BD", "Administrador de BD", "Desarrollador Backend"]
          }
        ],
        "Java": [
          {
            "course_image":"assets/courses/Learn-Java-For-Android-App-Development-FREE.png",
            "name": "Construir Aplicaciones Android con Java",
            "description": "Desarrollo de apps móviles Android, manejo de eventos e interfaces.",
            "career": ["Desarrollador Android", "Ingeniero Móvil"]
          },
          {
            "course_image":"assets/courses/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_wz4lrwt4l98m3q9l97fg.webp",
            "name": "Crear APIs REST con Spring y Java",
            "description": "Desarrollo de servicios RESTful con Spring y Java.",
            "career": ["Desarrollador Java", "Ingeniero de Software"]
          }
        ],
        "C": [
          {
            "course_image":"assets/courses/1679804058550.jpeg",
            "name": "Aprender el Lenguaje de Programación C",
            "description": "Introducción al lenguaje C, estructuras de control y memoria.",
            "career": ["Programador C", "Ingeniero de Sistemas Embebidos"]
          }
        ],
        "R": [
          {
            "course_image":"assets/courses/Rprogramming.jpg",
            "name": "Analizar Data con R",
            "description": "Análisis estadístico y visualización avanzada con R.",
            "career": ["Analista de Datos", "Científico de Datos"]
          }
        ],
        "PHP": [
          {
            "course_image":"assets/courses/php_course.png",
            "name": "Aprender PHP",
            "description": "Desarrollo de sitios web dinámicos y conexión con bases de datos usando PHP.",
            "career": ["Desarrollador PHP", "Ingeniero Backend"]
          }
        ],
        "Swift": [
          {
            "course_image":"assets/courses/swift_programming.png",
            "name": "Desarrollar Aplicaciones iOS con SwiftUI",
            "description": "Construcción de apps iOS modernas con SwiftUI.",
            "career": ["Desarrollador iOS", "Ingeniero de Software Móvil"]
          }
        ],
        "Excel & Power BI": [
          {
            "course_image":"assets/courses/K2un32dRwCDR7KcVnooD_Excel+for+Biz+Analysts.jpg",
            "name": "Excel Avanzado para Análisis de Datos Empresariales",
            "description": "Análisis avanzado de datos empresariales utilizando Excel.",
            "career": ["Analista de Datos Empresariales", "Consultor de Datos"]
          },
          {
            "course_image":"assets/courses/excel-automatation.png",
            "name": "Automatización y Eficiencia con Macros en Excel",
            "description": "Automatización de procesos y mejora de eficiencia con macros en Excel.",
            "career": ["Especialista en Automatización", "Ingeniero de Datos"]
          },
          {
            "course_image":"assets/courses/0-7PYW_0c0WGfrJ1NK.png",
            "name": "Power Query y Power Pivot en Excel: Transformación de Datos",
            "description": "Transformación y modelado de datos utilizando Power Query y Power Pivot.",
            "career": ["Analista de Datos", "Ingeniero de Datos"]
          },
          {
            "course_image":"assets/courses/predictive-analytics-excel-spreadsheet-template.png",
            "name": "Análisis Predictivo con Excel",
            "description": "Implementación de análisis predictivo utilizando Excel.",
            "career": ["Analista de Negocios", "Científico de Datos"]
          },
          {
            "name": "Visualización de Datos Efectiva con Power BI",
            "description": "Creación de visualizaciones efectivas de datos con Power BI.",
            "career": ["Consultor BI", "Analista de Datos"]
          }
        ]
      }
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
  const { t } = useLocalization();

  useEffect(() => {
    // Flatten the data
    const courses = [];
    for (const category in courseData) {
      for (const technology in courseData[category]) {
        courseData[category][technology].forEach(course => {
          courses.push({
            ...course,
            category,
            technology,
            // Prepend '/' to make it an absolute path from public root (fixes the image loading issue)
            course_image: course.course_image ? `/${course.course_image}` : '/assets/img/course/default.png',
          });
        });
      }
    }
    setAllCourses(courses);
    setFilteredCourses(courses);

    // Extract unique categories and technologies
    const uniqueCategories = [...new Set(courses.map(c => c.category))].filter(Boolean);
    const uniqueTechnologies = [...new Set(courses.map(c => c.technology))].filter(Boolean);
    setCategories(uniqueCategories);
    setTechnologies(uniqueTechnologies);
  }, []);

  const filterCourses = () => {
    let filtered = allCourses;
    if (selectedCategory) {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    if (selectedTechnology) {
      filtered = filtered.filter(c => c.technology === selectedTechnology);
    }
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.technology.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedTechnology('');
    setSearchQuery('');
    setFilteredCourses(allCourses);
    setCurrentPage(1);
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = {
    course: selectedCourse.name,
    technology: selectedCourse.technology,
    category: selectedCourse.category,
    fullName: e.target.fullName.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value || 'No additional message provided',
  };

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send inquiry');
    }

    setIsSubmitting(false);
    setShowSuccess(true);
    e.target.reset();
    
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
                  <div className="mt-4 lg:mt-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder={t('searchCourses')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-3 w-80 rounded-xl border-2 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">{t('category')}</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-12 rounded-xl border-2">
                        <SelectValue placeholder={t('allCategories')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Technology */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">{t('technology')}</Label>
                    <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
                      <SelectTrigger className="h-12 rounded-xl border-2">
                        <SelectValue placeholder={t('allTechnologies')} />
                      </SelectTrigger>
                      <SelectContent>
                        {technologies.map(tech => (
                          <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Filter Button */}
                  <Button 
                    onClick={filterCourses}
                    className="h-12 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {t('applyFilters')}
                  </Button>

                  {/* Reset Button */}
                  <Button 
                    variant="outline"
                    onClick={resetFilters}
                    className="h-12 rounded-xl font-semibold border-2"
                  >
                    {t('resetAll')}
                  </Button>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {t('coursesCount', { count: filteredCourses.length })}
                    </p>
                    <p className="text-sm text-gray-600">{t('available')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {coursesToDisplay.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noCoursesFound')}</h3>
                <p className="text-gray-600 mb-4">{t('adjustSearchCriteria')}</p>
                <Button onClick={resetFilters} variant="outline">
                  {t('resetFilters')}
                </Button>
              </div>
            ) : (
              coursesToDisplay.map((course, index) => (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.course_image}
                      alt={course.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0 font-semibold">
                        {course.technology}
                      </Badge>
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
                      {t('bookMySeat')}
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
                {t('previous')}
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
                {t('next')}
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
                  <Input id="fullName" name="fullName" required placeholder={t('enterFullName')} className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="email">{t('email')} <span className="text-destructive">*</span></Label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="phone">{t('phone')} <span className="text-destructive">*</span></Label>
                  <Input id="phone" name="phone" type="tel" required placeholder={t('phonePlaceholder')} className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea id="message" name="message" placeholder={t('messagePlaceholder')} className="rounded-xl" />
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