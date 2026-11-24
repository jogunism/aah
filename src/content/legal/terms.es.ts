// 이용약관·취소 정책 스페인어 본문(영어 terms.en.ts 번역)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Condiciones y política de cancelación',
  metaDescription: 'Condiciones del servicio y política de cancelación para las solicitudes de cursos de coreano con aah! education.',
  title: 'Condiciones y política de cancelación',
  effective: 'En vigor desde el 1 de septiembre de 2026',
  intro: [
    'Estas condiciones se aplican al servicio de solicitud de cursos de coreano que presta aah! education Europe («nosotros»). Léelas junto con nuestra Política de privacidad.',
  ],
  sections: [
    {
      title: '1. Ámbito de aplicación',
      blocks: [
        'Estas condiciones se aplican cuando tú («el solicitante») utilizas nuestro servicio para solicitar un curso de coreano y servicios relacionados, como la reserva de residencia.',
        'Los contratos que celebres a través de nosotros con centros, residencias u otros proveedores están sujetos además a sus propias normas (por ejemplo, sus normas de reembolso).',
      ],
    },
    {
      title: '2. Solicitud y contrato',
      blocks: [
        'Tu solicitud se considera recibida cuando envías el formulario de solicitud en aah.education. Aceptas que transmitamos tu solicitud al centro.',
        '**El envío del formulario no da lugar a un contrato.** Revisamos tu solicitud y te enviamos una **confirmación de solicitud** con las opciones de precio y la información importante.',
        'El contrato empieza cuando eliges una opción y aceptas la confirmación de solicitud. Desde ese momento se aplican las normas de cancelación del apartado 7.',
        'Responde a la confirmación de solicitud **en un plazo de 4 días**. Si no tenemos noticias tuyas en ese plazo, podemos dejar tu solicitud en espera o cerrarla.',
        'Los solicitantes menores de 18 años necesitan el consentimiento de su padre, madre o tutor legal. Lo pedimos junto con la confirmación.',
      ],
    },
    {
      title: '3. Quién puede presentar una solicitud',
      blocks: [
        {
          list: [
            'Cumples los requisitos de admisión del centro y del curso (edad, estudios, titulaciones, etc.).',
            'Ni tú ni ninguna persona que conviva contigo es miembro de una organización criminal ni mantiene relaciones con ella.',
          ],
        },
      ],
    },
    {
      title: '4. Cuándo podemos rechazar una solicitud',
      blocks: [
        {
          list: [
            'Es evidente que no cumples los requisitos de admisión.',
            'Tienes menos de 18 años y no cuentas con el consentimiento de tu padre, madre o tutor.',
            'Los trámites necesarios no pueden completarse antes del plazo fijado por el centro.',
            'Te contactamos por teléfono o correo electrónico y no recibimos respuesta en la fecha que te indicamos.',
            'Consideramos que tu estado de salud no te permite estudiar en el extranjero.',
            'La solicitud parece presentarse con una finalidad distinta a la de estudiar.',
            'Has ocultado una denegación de entrada o de visado, una expulsión o antecedentes penales anteriores, o consideramos por otro motivo que la solicitud no es adecuada.',
          ],
        },
      ],
    },
    {
      title: '5. Tarifas y pago',
      blocks: [
        'Facturamos nuestra tarifa de servicio junto con las tasas del centro, de la residencia y de otros proveedores, y pagamos a estos proveedores en tu nombre.',
        'Paga mediante transferencia bancaria a la cuenta que te indiquemos. **Las comisiones bancarias corren de tu cuenta.** Indica siempre tu número de solicitud como concepto de la transferencia.',
        'Cuando recibimos tu pago, te enviamos una factura por correo electrónico.',
        'Si no pagas dentro del plazo, podemos resolver el contrato (apartado 8).',
      ],
    },
    {
      title: '6. Cambios en el importe',
      blocks: [
        {
          list: [
            'Si un centro o una residencia modifica sus tasas, pagas la diferencia.',
            'Si un centro fija un precio especial, este debe pagarse dentro del plazo fijado por el centro.',
            'Las tarifas por un apoyo adicional excepcional que hayas solicitado no se modifican ni se reembolsan una vez pagadas.',
            'Una vez iniciado el contrato, el programa puede cambiar debido a nuevas normas del centro o de Corea. Las tasas de residencia pueden variar según el número de días del periodo.',
            'Si los tipos de cambio varían bruscamente, o el importe cambia de forma significativa por catástrofes naturales, guerras, disturbios u órdenes gubernamentales mientras preparamos tu solicitud, es posible que tengas que pagar la diferencia.',
          ],
        },
      ],
    },
    {
      title: '7. Cancelación por tu parte y reembolsos',
      blocks: [
        'Puedes cancelar en cualquier momento. Comunícanoslo por correo electrónico (contact@aah.education) o por correo postal. La fecha de cancelación es el día laborable en que **recibimos** tu comunicación.',
        'Antes de aceptar la confirmación de solicitud, puedes cancelar sin coste alguno.',
        'A partir de entonces, reembolsamos la siguiente parte de **nuestra tarifa de servicio** (curso de larga duración {{eur:450}}, curso de corta duración {{eur:350}}):',
        {
          table: {
            head: ['Cuándo cancelas', 'Reembolso – curso de larga duración', 'Reembolso – curso de corta duración'],
            rows: [
              ['Antes de aceptar la confirmación de solicitud', 'Aún no se ha pagado nada', 'Aún no se ha pagado nada'],
              ['Después de aceptar la confirmación de solicitud', '{{eur:380}}', '{{eur:260}}'],
              ['A partir del 7.º día tras tu aceptación', '{{eur:340}}', '{{eur:210}}'],
              ['Después de que hayamos presentado tu solicitud al centro', '{{eur:310}}', '{{eur:170}}'],
              ['Después de completarse el trámite con el centro o de confirmarse tu alojamiento', 'Sin reembolso', 'Sin reembolso'],
            ],
          },
        },
        'Los importes se muestran en la moneda que hayas elegido en nuestra web, convertidos desde el euro al tipo de cambio actual. Se aplican los importes indicados en tu confirmación de solicitud.',
        '«Trámite con el centro completado» significa que has presentado la solicitud, has sido admitido y se ha pagado tu matrícula.',
        'La matrícula y las tasas de residencia se reembolsan según las normas del centro y de la residencia (apartado 10). Las comisiones bancarias de los reembolsos corren de tu cuenta.',
        '**Derecho de desistimiento (consumidores de la UE, el EEE y el Reino Unido):** puedes desistir del contrato en un plazo de 14 días desde que aceptas la confirmación de solicitud, sin necesidad de indicar el motivo. Al aceptarla, nos pides que empecemos de inmediato. Si después desistes dentro de esos 14 días, pagas un importe proporcional a los servicios que ya hayamos prestado, pero nunca más que los importes retenidos según la tabla anterior.',
        '**Fuerza mayor:** si catástrofes naturales, guerras, disturbios, órdenes gubernamentales u otros acontecimientos similares hacen imposible el servicio, o muy probable que llegue a serlo, puedes cancelar sin ningún coste.',
        'No aceptamos cancelaciones a través de nosotros por los siguientes motivos personales: insatisfacción con el entorno, la ubicación, las instalaciones o las clases del centro; con el profesorado, el personal u otros estudiantes; con el curso, la clase o el nivel que te hayan asignado; con las personas con las que convives; o con el entorno, la ubicación o las instalaciones del alojamiento. En estos casos se aplican las normas del centro o del alojamiento.',
      ],
    },
    {
      title: '8. Resolución por nuestra parte',
      blocks: [
        'Podemos resolver el contrato, previa notificación, si:',
        {
          list: [
            'has facilitado información falsa;',
            'una enfermedad u otros motivos te impiden participar en el programa;',
            'tú o personas relacionadas contigo causáis problemas a otros clientes o perturbáis nuestro trabajo, o es muy probable que lo hagáis;',
            'catástrofes naturales, guerras, disturbios, accidentes de transporte, órdenes gubernamentales u otras causas ajenas a nuestro control hacen imposible el servicio;',
            'no envías los documentos que necesitamos dentro del plazo;',
            'no podemos contactar contigo durante un periodo prolongado;',
            'no pagas dentro del plazo;',
            'un comportamiento abusivo o amenazante nos impide tramitar tu solicitud.',
          ],
        },
      ],
    },
    {
      title: '9. Cambios en tus planes',
      blocks: [
        {
          table: {
            head: ['Cambio', 'Condiciones', 'Curso de larga duración', 'Curso de corta duración'],
            rows: [
              ['Aplazamiento al siguiente periodo en el mismo centro', 'El centro lo permite, se trata del periodo inmediatamente siguiente sin interrupción (o del posterior, si el centro lo permite) y no implica ningún reembolso', 'Gratis, una vez', 'Gratis, una vez (antes de que presentemos la solicitud al centro)'],
              ['Aplazamiento que implica liquidar una matrícula ya pagada', '', '{{eur:40}}', '{{eur:50}}'],
              ['Otros aplazamientos (un segundo aplazamiento, un periodo con interrupción o un centro que no lo permite)', 'Se trata como una cancelación (apartado 7) y una nueva solicitud', 'Tarifa de servicio de la nueva solicitud reducida en {{eur:40}}', 'Tarifa de servicio de la nueva solicitud reducida en {{eur:50}}'],
              ['Cambio a otro centro', 'En los 7 días siguientes a tu aceptación', 'Gratis', 'Gratis'],
              ['Cambio a otro centro', 'A partir del 7.º día, antes de que presentemos tu solicitud', '{{eur:40}}', '{{eur:50}}'],
              ['Cambio a otro centro', 'Después de que presentemos tu solicitud', '{{eur:70}}', '{{eur:90}}'],
            ],
          },
        },
        'Si el cambio de centro implica también un cambio de alojamiento, los costes del alojamiento se rigen por el apartado 10. El aplazamiento de un curso de corta duración en más de 3 meses se trata como una cancelación, salvo que el centro lo permita.',
      ],
    },
    {
      title: '10. Reembolso de la matrícula y del alojamiento',
      blocks: [
        {
          list: [
            'La matrícula ya pagada se reembolsa según las normas de reembolso del centro. Si solicitamos y recibimos el reembolso en tu nombre, cobramos una tarifa de gestión de {{eur:40}} (larga duración) o {{eur:50}} (corta duración), más las comisiones bancarias y otros costes reales.',
            'Las tasas de residencia se reembolsan según las normas de la residencia del centro.',
            'Otros alojamientos reservados a través de nosotros se rigen por las condiciones que te indiquemos al hacer la reserva. Las reservas con tarifa reducida y las estancias ya iniciadas, por lo general, no son reembolsables.',
            'No cobramos ninguna tarifa por cancelar el alojamiento antes de tu llegada; las comisiones bancarias del reembolso corren de tu cuenta.',
          ],
        },
      ],
    },
    {
      title: '11. Cancelación por causas ajenas a nuestro control',
      blocks: [
        'Si un programa se suspende o modifica por causas de las que no somos responsables, o no puedes participar porque un vuelo se cancela o se retrasa, la matrícula y el alojamiento se reembolsan en la medida en que lo permitan las normas del centro y del alojamiento, y nuestra tarifa de servicio no se reembolsa. Los vuelos, alojamientos y otros servicios que no hayamos reservado nosotros debes cancelarlos tú.',
      ],
    },
    {
      title: '12. Limitación de responsabilidad',
      blocks: [
        'No somos responsables de:',
        {
          list: [
            'acontecimientos ajenos a nuestro control, como catástrofes naturales, incendios, huelgas, epidemias, guerras, terrorismo, la quiebra o los accidentes de centros, alojamientos o empresas de transporte, cursos que no llegan a abrirse, cambios en las tasas o condiciones y cambios en las normas de visado o de entrada;',
            'daños derivados de causas de las que no somos responsables;',
            'la imposibilidad de obtener un vuelo, un pasaporte o un visado, ni de la denegación de entrada en Corea. Los visados los decide el consulado de Corea;',
            'las reclamaciones enumeradas al final del apartado 7;',
            'los conflictos con el centro una vez iniciado el curso, ni con tu alojamiento. Debes resolverlos tú, aunque te ayudamos en la medida de lo posible. Si fue el centro quien organizó tu alojamiento, resuélvelo directamente con el centro;',
            'los resultados de las pruebas del centro, la interrupción de tu curso por parte de un centro que te considere no apto, ni el contenido del propio curso;',
            'las tareas que encomendamos a empresas colaboradoras, salvo que el daño se deba a dolo o negligencia por nuestra parte.',
          ],
        },
        'Si, después de tu solicitud, resulta que no podemos conseguirte plaza debido a tus titulaciones o capacidades, te reembolsamos conforme a esta política, salvo que se deba a que facilitaste información falsa.',
        'Nada de lo dispuesto en estas condiciones limita nuestra responsabilidad en los casos en que la ley no permite limitarla.',
      ],
    },
    {
      title: '13. Conductas prohibidas',
      blocks: [
        'No está permitido lo siguiente. Si se produce, podemos reclamar una indemnización por daños y perjuicios:',
        {
          list: [
            'conductas contrarias al orden público o a las buenas costumbres;',
            'cometer delitos o participar en ellos;',
            'infringir la ley;',
            'vulnerar la propiedad intelectual nuestra o de terceros;',
            'vulnerar los bienes o la privacidad nuestros o de terceros;',
            'causarnos daños a nosotros o a terceros;',
            'insultos, difamación, amenazas, lenguaje ofensivo o violencia;',
            'perturbar nuestro trabajo o dañar la confianza en nosotros.',
          ],
        },
      ],
    },
    {
      title: '14. Datos personales',
      blocks: ['Tratamos tus datos personales según se describe en nuestra Política de privacidad.'],
    },
    {
      title: '15. Otras cuestiones',
      blocks: [
        'Las cuestiones que no se resuelvan en estas condiciones se acordarán de buena fe entre tú y nosotros.',
        'Estas condiciones se rigen por la legislación alemana.',
        'Si eres consumidor, se aplican siempre las normas imperativas de protección de los consumidores de tu país de residencia.',
      ],
    },
    {
      title: '16. Cambios en estas condiciones',
      blocks: [
        'Podemos actualizar estas condiciones. Las nuevas condiciones se aplican a los contratos aceptados después de su fecha de entrada en vigor; los contratos ya aceptados mantienen las condiciones vigentes en el momento de tu aceptación.',
      ],
    },
    {
      title: 'Contacto',
      blocks: ['aah! education Europe · Titular: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Alemania · contact@aah.education'],
    },
  ],
};

export default doc;
