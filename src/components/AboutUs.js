"use client"
import Image from 'next/image';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Badge } from '../components/ui/badge';
import { Star } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLocalization();

  return (
    <main className="min-h-screen">
      {/* Hero About Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {t('aboutHeroBadge')}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('aboutHeroTitle')}
                </h1>
              </div>
              
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  {t('aboutHeroDescription1')}
                </p>
                <p>
                  {t('aboutHeroDescription2')}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Image src="/assets/img/icon/icon-and-text/key.svg" alt={t('lifetimeAccessAlt')} width={32} height={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('lifetimeAccess')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t('lifetimeAccessDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Image src="/assets/img/icon/icon-and-text/board.svg" alt={t('expertTutorsAlt')} width={32} height={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('expertTutors')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t('expertTutorsDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Image src="/assets/img/icon/icon-and-text/monitor.svg" alt={t('practicalLearningAlt')} width={32} height={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('practicalCurriculum')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t('practicalCurriculumDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  {t('getFreeConsultation')}
                </Button>
                </Link>
                <Link href="/international_certifications">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  {t('exploreCourses')}
                </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/assets/img/myimages/building-4884852_1280.jpg" 
                  alt={t('modernCampusAlt')} 
                  width={600} 
                  height={700}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Image src="/assets/img/sections/client/graduation.png" alt={t('successRateAlt')} width={24} height={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('successRate')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '/assets/img/sections/client/people-group.png', number: '458,712', labelKey: 'studentsGuided', color: 'blue' },
              { icon: '/assets/img/sections/client/customer-care.png', number: '211', labelKey: 'expertConsultants', color: 'green' },
              { icon: '/assets/img/sections/client/graduation.png', number: '425', labelKey: 'coursesOffered', color: 'purple' },
              { icon: '/assets/img/sections/client/world.png', number: '32', labelKey: 'countries', color: 'orange' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex p-4 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 mb-4 group-hover:scale-110 transition-transform`}>
                  <Image src={stat.icon} alt={t(stat.labelKey)} width={48} height={48} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/myimages/res.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 dark:text-blue-300">
                {t('ourCommitment')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t('missionVisionTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('missionVisionStats')}
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  icon: '/assets/img/icon/icon-and-text/02/01.png',
                  titleKey: 'ourVision',
                  descriptionKey: 'ourVisionDesc',
                  color: 'blue'
                },
                {
                  icon: '/assets/img/icon/icon-and-text/02/02.png',
                  titleKey: 'ourMission',
                  descriptionKey: 'ourMissionDesc',
                  color: 'green'
                },
                {
                  icon: '/assets/img/icon/icon-and-text/02/03.png',
                  titleKey: 'ourGoal',
                  descriptionKey: 'ourGoalDesc',
                  color: 'purple'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 p-6 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                  <div className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-lg flex-shrink-0`}>
                    <Image src={item.icon} alt={t(item.titleKey)} width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t(item.titleKey)}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t(item.descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
              {t('successStories')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('testimonialsDescription')}
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {[
                { 
                  name: "Danilo Mucedola", 
                  country: "Italy",
                  image: "/assets/brands/Illahi-Bakhsh.webp",
                  textKey: "testimonial1"
                },
                { 
                  name: "Ralph Murphy", 
                  country: "Austin, Texas, USA",
                  image: "/assets/brands/s200_shoaib_ahmed.shah.jpg",
                  textKey: "testimonial2"
                },
                { 
                  name: "Kristin Watson", 
                  country: "Croatia",
                  image: "/assets/brands/Marvi-Shaikh.webp",
                  textKey: "testimonial3"
                },
                { 
                  name: "Alex Johnson", 
                  country: "Australia",
                  image: "/assets/brands/1733806280692.jpeg",
                  textKey: "testimonial4"
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                        "{t(testimonial.textKey)}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            width={50} 
                            height={50}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.country}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative static transform-none" />
              <CarouselNext className="relative static transform-none" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              {t('startFreeConsultation')}
            </Button>
            </Link>
            <Link href="/executive_programs">
            <Button size="lg" variant="outline" >
              {t('browseCourses')}
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}