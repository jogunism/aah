// 개인정보·보안 정책 스페인어 본문(영어 privacy.en.ts 번역)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Política de privacidad',
  metaDescription: 'Cómo aah! education recoge, utiliza y protege tus datos personales.',
  title: 'Política de privacidad y seguridad',
  effective: 'En vigor desde el 1 de septiembre de 2026',
  intro: [
    'Nos tomamos en serio la protección de tus datos personales. Como empresa que gestiona solicitudes de estudios en el extranjero, cumplimos la normativa de protección de datos aplicable, incluido el Reglamento General de Protección de Datos de la UE (RGPD), y cuidamos tus datos con esmero.',
  ],
  sections: [
    {
      title: '1. Responsable del tratamiento',
      blocks: ['aah! education Europe («nosotros») es responsable del tratamiento de tus datos personales. Puedes contactar con nosotros en contact@aah.education.', 'Dirección postal: aah! education Europe, titular Hyun Woo Cho, Nicolaiweg 6, 65812 Bad Soden am Taunus, Alemania.'],
    },
    {
      title: '2. Qué son los datos personales',
      blocks: [
        'Son datos personales todas las informaciones que te identifican, como tu nombre, dirección, número de teléfono o fecha de nacimiento. La información que solo te identifica al combinarse con otra información también es un dato personal.',
      ],
    },
    {
      title: '3. Qué datos recogemos y por qué',
      blocks: [
        {
          table: {
            head: ['Datos', 'Cuándo', 'Finalidad', 'Base jurídica (RGPD)'],
            rows: [
              ['Nombre, correo electrónico, número de teléfono, fecha de nacimiento, nacionalidad, dirección, título más alto, centro preferido, periodo y fechas, nivel de coreano, tu mensaje', 'Cuando envías el formulario de solicitud', 'Revisar tu solicitud, preparar tu confirmación de solicitud, presentar la solicitud al centro, emitir facturas', 'Medidas precontractuales adoptadas a petición tuya y ejecución del contrato (art. 6.1.b)'],
              ['Tu respuesta a la confirmación de solicitud (opción elegida, tu nombre, fecha y hora, observaciones)', 'Cuando aceptas', 'Constancia del contrato', 'Ejecución del contrato (art. 6.1.b)'],
              ['Problemas de salud o alergias', 'Solo si nos lo comunicas', 'Pedir al centro o al alojamiento el apoyo que necesitas', 'Tu consentimiento explícito (art. 9.2.a), que puedes retirar en cualquier momento'],
              ['Copia del pasaporte, foto, título, copia del visado', 'Cuando nos los envías', 'Solicitud al centro y orientación sobre el visado', 'Ejecución del contrato (art. 6.1.b)'],
              ['Pagos y facturas', 'Cuando pagas', 'Contabilidad y obligaciones fiscales', 'Obligación legal (art. 6.1.c)'],
              ['Estadísticas de visitas (cookies)', 'Cuando visitas el sitio web', 'Mejorar el sitio web', 'Tu consentimiento en el aviso de cookies (art. 6.1.a)'],
            ],
          },
        },
        'Sin la información necesaria, es posible que no podamos prestar el servicio. No utilizamos tus datos para otras finalidades sin tu consentimiento. Podemos utilizar estadísticas anonimizadas, que ya no te identifican, para mejorar nuestro servicio.',
      ],
    },
    {
      title: '4. Quién recibe tus datos',
      blocks: [
        {
          list: [
            '**Centros y residencias en Corea:** los datos que necesitan para tu admisión y tu solicitud de residencia.',
            '**Proveedores de servicios que actúan por cuenta nuestra:** servidores y almacenamiento (Amazon Web Services, región de Fráncfort, Alemania), alojamiento del sitio web (AWS Amplify), correo electrónico (Google), estadísticas de visitas (Google Analytics, solo con tu consentimiento) y el feed de Instagram de nuestro sitio web (Behold). Solo tratan los datos siguiendo nuestras instrucciones.',
            'Otros destinatarios solo si das tu consentimiento o nos lo pides, si es necesario para proteger la vida, la salud o los bienes de una persona y no es posible obtener tu consentimiento, o si un tribunal o una autoridad lo exige conforme a la ley.',
          ],
        },
      ],
    },
    {
      title: '5. Transferencias fuera de la UE',
      blocks: [
        'Para presentar tu solicitud al centro, enviamos tus datos a la República de Corea. En diciembre de 2021, la Comisión Europea decidió que Corea garantiza un nivel adecuado de protección de datos, y el Reino Unido adoptó la misma decisión en 2022. Para las transferencias a otros países utilizamos las garantías exigidas por la ley, como las cláusulas contractuales tipo.',
      ],
    },
    {
      title: '6. Cuánto tiempo conservamos tus datos',
      blocks: [
        {
          table: {
            head: ['Datos', 'Plazo de conservación'],
            rows: [
              ['Datos de la solicitud, confirmación y cuenta', '3 años tras la finalización del contrato'],
              ['Documentos que nos envías (pasaporte, foto, título, visado)', 'Se eliminan 6 meses después de finalizar el trámite'],
              ['Información sobre la salud', 'Se elimina al finalizar el trámite o cuando retiras tu consentimiento'],
              ['Facturas y registros de pago', 'Durante el tiempo que exija la normativa fiscal (hasta 10 años)'],
              ['Solicitudes que no dan lugar a un contrato', '6 meses después de la solicitud'],
            ],
          },
        },
      ],
    },
    {
      title: '7. Tus derechos',
      blocks: [
        'Puedes solicitarnos en cualquier momento lo siguiente, escribiendo a contact@aah.education. Comprobamos que la solicitud procede de ti y respondemos sin demora, a más tardar en el plazo de un mes.',
        {
          list: [
            'acceso a tus datos y una copia de ellos;',
            'rectificación de los datos inexactos;',
            'supresión, salvo cuando la ley nos obligue a conservarlos;',
            'limitación del tratamiento u oposición al mismo;',
            'recibir tus datos en un formato portable;',
            'retirar tu consentimiento (esto no afecta al tratamiento realizado antes de la retirada);',
            'presentar una reclamación ante la autoridad de protección de datos de tu país.',
          ],
        },
      ],
    },
    {
      title: '8. Seguridad',
      blocks: [
        'Protegemos tus datos frente a la pérdida, el uso indebido, el acceso no autorizado y las modificaciones:',
        {
          list: [
            '**Conexiones cifradas:** nuestro sitio web solo funciona mediante HTTPS (TLS).',
            '**Contraseñas:** cuando se abra tu página personal de solicitud, las contraseñas nunca se guardan de forma legible, sino solo como un hash irreversible (scrypt). Nadie en aah! education puede ver tu contraseña. Se te pedirá que cambies tu primera contraseña temporal.',
            '**Protección del inicio de sesión:** tras varios intentos con una contraseña incorrecta, el inicio de sesión se bloquea durante un tiempo. Tu sesión se guarda en una cookie segura que los scripts de la página no pueden leer.',
            '**Documentos:** los archivos que nos envías se guardan cifrados en un almacenamiento no público en la UE. Los enlaces de descarga se generan solo para ti y son válidos durante unos minutos.',
            '**Acceso limitado:** solo el personal que necesita tus datos para su trabajo puede verlos.',
            '**Incidentes:** si se produce una violación de la seguridad de los datos, la notificamos a la autoridad de control en un plazo de 72 horas, como exige la ley, y te informamos sin demora si supone un alto riesgo para ti.',
          ],
        },
        '**Lo que te pedimos:** no compartas tu contraseña. Nunca te pediremos tu contraseña por correo electrónico ni por teléfono. Si recibes un correo electrónico que diga que nuestros datos bancarios han cambiado, consúltanos antes de hacer cualquier transferencia.',
      ],
    },
    {
      title: '9. Cookies',
      blocks: [
        'Nuestro sitio web utiliza cookies necesarias para tus preferencias de idioma y moneda y, en tu página personal, para mantener tu sesión iniciada. Las cookies de estadísticas de visitas (Google Analytics) solo se utilizan si las aceptas en el aviso de cookies.',
      ],
    },
    {
      title: '10. Información de este sitio web',
      blocks: [
        {
          list: [
            'Recopilamos la información de este sitio web con cuidado, pero no podemos garantizar que sea completa, exacta o actual. Comprobamos la información sobre los centros visitándolos y consultándoles directamente, y la información sobre visados con las autoridades oficiales, pero ambas cambian con frecuencia. Utilízala como referencia a la hora de elegir un centro.',
            'Salvo que la culpa sea nuestra, no somos responsables de los errores de este sitio web ni de los conflictos entre usuarios y terceros derivados de su uso.',
            'El contenido de este sitio web puede modificarse o eliminarse sin previo aviso.',
            'Cuando seamos responsables, nuestra responsabilidad se limita a los daños directos y previsibles, salvo que hayamos actuado con dolo o negligencia grave.',
            'No somos responsables de los daños causados por virus, ataques informáticos, catástrofes naturales u otras causas que no puedan evitarse con las precauciones habituales.',
          ],
        },
      ],
    },
    {
      title: '11. Cambios en esta política',
      blocks: ['Si modificamos esta política, publicaremos la nueva versión en esta página con su fecha de entrada en vigor y te informaremos por correo electrónico de los cambios importantes.'],
    },
    {
      title: 'Contacto',
      blocks: ['aah! education Europe · Titular: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Alemania · contact@aah.education'],
    },
  ],
};

export default doc;
