import { createClient } from '@/utils/supabase/server';
import { Post } from '@/utils/types/post.interface';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const Page: FC<Props> = async ({ params }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single<Post>();
  console.log(data);

  return (
    <main className="mt-16 max-w-3xl mx-auto">
      <article className="pt-12 flex flex-col gap-4">
        <h3 className="text-app-primary text-4xl font-bold">{data?.title}</h3>
        <div className="border-y border-gray-500 flex items-center gap-4 py-4 text-app-text">
          <div className="flex items-center gap-1">
            <UserCircleIcon className="w-4" />
            <span className="text-sm">Barbadens</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4" />
            <span className="text-sm">Julio 18, 2024</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4" />
            <span className="text-sm">3:00pm</span>
          </div>
        </div>
        <div className="w-full h-[200px] relative">
          <Image
            src={'/images/model-test.jpg'}
            alt="blog-image"
            fill
            className="object-cover object-center"
          />
        </div>
        <div
          className="post"
          dangerouslySetInnerHTML={{
            __html: data?.content || content,
          }}
        ></div>
      </article>
      <div className="py-8">
        Compartir en:
        <div className="flex items-center gap-2 ">
          <button className="py-4 px-2 bg-blue-700 text-white flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="white"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 310 310"
            >
              <g id="XMLID_834_">
                <path
                  id="XMLID_835_"
                  d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
		c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
		V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
		C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
		c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
                />
              </g>
            </svg>
            Facebook
          </button>
          <button className="py-4 px-2 bg-green-500 text-white flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                fill="white"
              />
            </svg>
            Whatsapp
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;

const content = `
<div class="elementor-widget-container"><p><strong>Julio Cortazar</strong></p><p><strong>Julio Cortázar (1914-1984) pronunció el siguiente discurso en el Coloquio de París sobre la política de desaparición forzada de personas, Senado de la República Francesa, enero de 1981. El escritor formó parte del Tribunal Russell II que, en 1973, juzgó en Roma los crímenes de las dictaduras latinoamericanas. </strong></p><p><strong>POR QUÉ CORTAZAR HOY</strong></p><p>¡Qué tiempos estos en que hay que defender lo obvio! supo decir Bertolt Brecht. Pero por cierto, hoy nos enfrentamos a una ola de negacionismo cuando no de abierta reivindicación del Terrorismo de Estado de la última dictadura. Más todavía, el ejercicio de la memoria, y el consiguiente y pertinaz reclamo de justicia, son pasibles de sanción por considerarse adoctrinamiento.</p><p>Por eso, este discurso está destinado a todas las personas honradas y democráticas pero en particular a nuestros educadores y educadoras, para que lo trabajen en sus clases. Para que junto a sus estudiantes, <strong>vuelvan a sentir la satisfacción moral de un acto de libertad</strong> (Rodolfo Walsh)</p><p>——————————————————————————————————————-</p><p>“<strong>P</strong>ienso que todos los aquí reunidos coincidirán conmigo en que cada vez que a través de testimonios personales o de documentos tomamos contacto con la cuestión de los desaparecidos en la Argentina o en otros países sudamericanos, el sentimiento que se manifiesta casi de inmediato es el de lo diabólico. Desde luego, vivimos en una época en la que referirse al diablo parece cada vez más ingenuo o más tonto; y sin embargo es imposible enfrentar el hecho de las desapariciones sin que algo en nosotros sienta la presencia de un elemento infrahumano, de una fuerza que parece venir de las profundidades, de esos abismos donde inevitablemente la imaginación termina por situar a todos aquellos que han desaparecido. Si las cosas parecen relativamente explicables en la superficie -los propósitos, los métodos y las consecuencias de las desapariciones-, queda sin embargo un trasfondo irreductible a toda razón, a toda justificación humana; y es entonces que el sentimiento de lo diabólico se abre paso como si por un momento hubiéramos vuelto a las vivencias medievales del bien y del mal, como si a pesar de todas nuestras defensas intelectuales lo demoníaco estuviera una vez más ahí diciéndonos: «¿Ves? Existo: Ahí tienes la prueba.»</p><p>Pero lo diabólico, por desgracia, es en este caso humano, demasiado humano; quienes han orquestado una técnica para aplicarla mucho más allá de casos aislados y convertirla en una práctica de cuya multiplicación sistemática han dado ideas las cifras publicadas a raíz de la reciente encuesta de la OEA, saben perfectamente que ese procedimiento tiene para ellos una doble ventaja: la de eliminar a un adversario real o potencial (sin hablar de los que no lo son pero que caen en la trampa por juegos del azar, de la brutalidad o del sadismo), y a la vez injertar, mediante la más monstruosa de las cirugías, la doble presencia del miedo y de la esperanza en aquellos a quienes les toca vivir la desaparición de seres queridos. Por un lado se suprime a un antagonista virtual o real; por el otro se crean las condiciones para que los parientes o amigos de las víctimas se vean obligados en muchos casos a guardar silencio como única posibilidad de salvaguardar la vida de aquellos que su corazón se niega a admitir como muertos.</p><p>Si basándose en una estimación que parece estar muy por debajo de la realidad, se habla de ocho o diez mil desaparecidos en la Argentina , es fácil imaginar el número de quienes conservan todavía la esperanza de volver a verlos con vida. La extorsión moral que ello significa para estos últimos, extorsión muchas veces acompañada de la estafa lisa y llana que consiste en prometer averiguaciones positivas a cambio de dinero, es la prolongación abominable de ese estado de cosas donde nada tiene definición, donde promesas y medias palabras multiplican al infinito un panorama cotidiano lleno de siluetas crepusculares que nadie tiene la fuerza de sepultar definitivamente.</p><p>Muchos de nosotros poseemos testimonios insoportables de este estado de cosas, que puede llegar incluso al nivel de los mensajes indirectos, de las llamadas telefónicas en las que se cree reconocer una voz querida que sólo pronuncia unas pocas frases para asegurar que todavía está de este lado, mientras quienes escuchan tienen que callar las preguntas más elementales por temor de que se vuelvan inmediatamente en contra del supuesto prisionero. Un diálogo real o fraguado entre el infierno y la tierra es el único aliento de esa esperanza que no quiere admitir lo que tantas evidencias negativas le están dando desde hace meses, desde hace años. Y si toda muerte humana entraña una ausencia irrevocable, ¿qué decir de esta ausencia que se sigue dando como presencia abstracta, como la obstinada negación de la ausencia final? Ese círculo faltaba en el infierno dantesco, y los supuestos gobernantes de mi país, entre otros, se han encargado de la siniestra tarea de crearlo y de poblarlo.</p><p>De esa población fantasmal, a la vez tan próxima y tan lejana, se trata en esta reunión. Por encima y por debajo de las consideraciones jurídicas, los análisis y las búsquedas normativas en el terreno del derecho interno e internacional, es de ese pueblo de las sombras que estamos hablando.</p><p>En esta hora de estudio y de reflexión, destinada a crear instrumentos más eficaces en defensa de las libertades y los derechos pisoteados por las dictaduras, la presencia invisible de miles y miles de desaparecidos antecede y rebasa y continúa todo el trabajo intelectual que podamos cumplir en estas jornadas. <em><strong>Aquí, en esta sala donde ellos no están, donde se los evoca como una razón de trabajo, aquí hay que sentirlos presentes y próximos, sentados entre nosotros, mirándonos, hablándonos. El hecho mismo de que entre los participantes y el público haya tantos parientes y amigos de desaparecidos vuelve todavía más perceptible esa innumerable muchedumbre congregada en un silencioso testimonio, en una implacable acusación.</strong></em> Pero también están las voces vivas de los sobrevivientes y de los testigos, y todos los que hayan leído informes como el de la Comisión de Derechos Humanos de la OEA guardan en su memoria, impresos con letras de fuego, los casos presentados como típicos, las muestras aisladas de un exterminio que ni siquiera se atreve a decir su nombre y que abarca a miles y miles de casos no tan bien documentados pero igualmente monstruosos. Así, mirando tan sólo hechos aislados, ¿quién podría olvidar la desaparición de la pequeña Clara Anahí Mariani, entre la de tantos otros niños y adolescentes que vivían fuera de la historia y de la política, sin la menor responsabilidad frente a los que ahora pretenden razones de orden y de soberanía nacional para justificar sus crímenes? ¿Quién olvida el destino de Silvia Corazza de Sánchez, la joven obrera cuya niña nació en la cárcel, y a la que llevaron meses después para que entregara la criatura a su abuela antes de hacerla desaparecer definitivamente? ¿Quién olvida el alucinante testimonio sobre el campo militar «La Perla» escrito por una sobreviviente, Graciela Susana Geuna, y publicado por la Comisión Argentina de Derechos Humanos?</p><p>Cito nombres al azar del recuerdo, imágenes aisladas de unas pocas lápidas en un interminable cementerio de sepultados en vida. Pero cada nombre vale por cien, por mil casos parecidos, que sólo se diferencian por los grados de crueldad, de esa monstruosa voluntad de exterminación que ya nada tiene que ver con la lucha abierta y sí en cambio con el aprovechamiento de la fuerza bruta, del anonimato y de las peores tendencias humanas convertidas en el placer de la tortura y de la vejación a seres indefensos. Si de algo siento vergüenza frente a este fratricidio que se cumple en el más profundo secreto para poder negarlo después cínicamente, es que sus responsables y ejecutores son argentinos o uruguayos o chilenos, son los mismos que antes y después de cumplir su sucio trabajo salen a la superficie y se sientan en los mismos cafés, en los mismos cines donde se reúnen aquellos que hoy o mañana pueden ser sus víctimas. Lo digo sin ánimo de paradoja: Más felices son aquellos pueblos que pudieron o pueden luchar contra el terror de una ocupación extranjera. Más felices, sí, porque al menos sus verdugos vienen de otro lado, hablan otro idioma, responden a otras maneras de ser. Cuando la desaparición y la tortura son manipuladas por quienes hablan como nosotros, tienen nuestros mismos nombres y nuestras mismas escuelas, comparten costumbres y gestos, provienen del mismo suelo y de la misma historia, el abismo que se abre en nuestra propia conciencia y en nuestro corazón es infinitamente más hondo que cualquier palabra que pretendiera describirlo.</p><p>Pero precisamente por eso, porque en este momento tocamos fondo como jamás lo tocó nuestra historia, llena sin embargo de etapas sombrías, precisamente por eso hay que asumir de frente y sin tapujos esa realidad que muchos pretenden dar ya por terminada. Hay que mantener en un obstinado presente, con toda su sangre y su ignominia, algo que ya se está queriendo hacer entrar en el cómodo país del olvido; hay que seguir considerando como vivos a los que acaso ya no lo están pero que tenemos la obligación de reclamar, uno por uno, hasta que la respuesta muestre finalmente la verdad que hoy se pretende escamotear. Por eso este coloquio, y todo lo que podamos hacer en el plano nacional e internacional, tiene un sentido que va mucho más allá de su finalidad inmediata: el ejemplo admirable de las Madres de Plaza de Mayo está ahí como algo que se llama dignidad, se llama libertad, y sobre todo se llama futuro”.</p><ul class="wp-block-list"><li><a href="https://dhpedia.wikis.cc/wiki/Comisi%C3%B3n_Nacional_sobre_la_Desaparici%C3%B3n_de_Personas" target="_blank" rel="noopener">Comisión Nacional sobre la Desaparición de Personas</a> (CONADEP)</li><li><a href="https://dhpedia.wikis.cc/wiki/Grupo_de_Trabajo_sobre_Desapariciones_Forzadas_o_Involuntarias" target="_blank" rel="noopener">Grupo de Trabajo sobre Desapariciones Forzadas o Involuntarias</a></li><li><a href="https://dhpedia.wikis.cc/wiki/Centro_de_Estudios_Legales_y_Sociales" target="_blank" rel="noopener">Centro de Estudios Legales y Sociales</a></li><li><a href="https://files.wikis.cc/dhpedia.wikis.cc/b/bd/Negaci%C3%B3n_del_Olvido_Julio_Cort%C3%A1zar.pdf" target="_blank" rel="noopener">Media:Negación del Olvido _Julio Cortázar.pdf</a></li></ul></div>  

`;
