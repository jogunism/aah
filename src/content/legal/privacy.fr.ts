// 개인정보·보안 정책 프랑스어 본문(영어 privacy.en.ts 번역)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Politique de confidentialité',
  metaDescription: 'Comment aah! education collecte, utilise et protège vos données personnelles.',
  title: 'Politique de confidentialité et de sécurité',
  effective: 'En vigueur au 23 novembre 2026',
  intro: [
    'Nous prenons la protection de vos données personnelles au sérieux. En tant qu’entreprise qui traite des candidatures d’études à l’étranger, nous respectons les lois applicables en matière de protection des données, notamment le Règlement général sur la protection des données de l’UE (RGPD), et prenons soin de vos données.',
  ],
  sections: [
    {
      title: '1. Responsable du traitement',
      blocks: ['aah! education Europe (« nous ») est responsable du traitement de vos données personnelles. Vous pouvez nous joindre à l’adresse contact@aah.education.'],
    },
    {
      title: '2. Qu’est-ce qu’une donnée personnelle',
      blocks: [
        'Une donnée personnelle est toute information qui vous identifie, comme votre nom, votre adresse, votre numéro de téléphone ou votre date de naissance. Une information qui ne vous identifie que combinée à d’autres informations est également une donnée personnelle.',
      ],
    },
    {
      title: '3. Ce que nous collectons et pourquoi',
      blocks: [
        {
          table: {
            head: ['Données', 'Quand', 'Finalité', 'Base juridique (RGPD)'],
            rows: [
              ['Nom, e-mail, numéro de téléphone, date de naissance, nationalité, adresse, diplôme le plus élevé, école souhaitée, session et dates, niveau de coréen, votre message', 'Lorsque vous envoyez le formulaire de candidature', 'Examen de votre candidature, préparation de votre confirmation de candidature, candidature auprès de l’école, émission des factures', 'Mesures précontractuelles prises à votre demande et exécution du contrat (art. 6, par. 1, point b, RGPD)'],
              ['Votre réponse à la confirmation de candidature (option choisie, votre nom, date et heure, remarques)', 'Lorsque vous confirmez', 'Preuve du contrat', 'Exécution du contrat (art. 6, par. 1, point b, RGPD)'],
              ['Problèmes de santé ou allergies', 'Uniquement si vous nous les communiquez', 'Demander à l’école ou à l’hébergement l’aide dont vous avez besoin', 'Votre consentement explicite (art. 9, par. 2, point a, RGPD), que vous pouvez retirer à tout moment'],
              ['Copie du passeport, photo, diplôme, copie du visa', 'Lorsque vous nous les envoyez', 'Candidature auprès de l’école et accompagnement pour le visa', 'Exécution du contrat (art. 6, par. 1, point b, RGPD)'],
              ['Paiements et factures', 'Lorsque vous payez', 'Comptabilité et fiscalité', 'Obligation légale (art. 6, par. 1, point c, RGPD)'],
              ['Statistiques de visite (cookies)', 'Lorsque vous visitez le site', 'Amélioration du site', 'Votre consentement via le bandeau cookies (art. 6, par. 1, point a, RGPD)'],
            ],
          },
        },
        'Sans les informations requises, il se peut que nous ne puissions pas fournir le service. Nous n’utilisons pas vos données à d’autres fins sans votre consentement. Nous pouvons utiliser des statistiques anonymisées, qui ne permettent plus de vous identifier, pour améliorer notre service.',
      ],
    },
    {
      title: '4. Destinataires de vos données',
      blocks: [
        {
          list: [
            '**Écoles et résidences en Corée :** les données dont elles ont besoin pour votre admission et votre demande de résidence.',
            '**Prestataires agissant pour notre compte :** serveurs et stockage (Amazon Web Services, région de Francfort, Allemagne), hébergement du site (AWS Amplify), e-mail (Google), statistiques de visite (Google Analytics, uniquement avec votre consentement) et le fil Instagram de notre site (Behold). Ils ne traitent les données que sur nos instructions.',
            'D’autres destinataires uniquement si vous l’acceptez ou nous le demandez, si cela est nécessaire pour protéger la vie, la santé ou les biens d’une personne et que votre consentement ne peut pas être obtenu, ou si un tribunal ou une autorité l’exige en vertu de la loi.',
          ],
        },
      ],
    },
    {
      title: '5. Transferts hors de l’UE',
      blocks: [
        'Pour présenter votre candidature à l’école, nous transmettons vos données à la République de Corée. La Commission européenne a décidé en décembre 2021 que la Corée assure un niveau de protection des données adéquat, et le Royaume-Uni a pris la même décision en 2022. Pour les transferts vers d’autres pays, nous utilisons les garanties exigées par la loi, comme les clauses contractuelles types.',
      ],
    },
    {
      title: '6. Durée de conservation',
      blocks: [
        {
          table: {
            head: ['Données', 'Conservées'],
            rows: [
              ['Données de candidature, confirmation et compte', '3 ans après la fin du contrat'],
              ['Documents que vous envoyez (passeport, photo, diplôme, visa)', 'Supprimés 6 mois après la fin de la procédure'],
              ['Informations de santé', 'Supprimées à la fin de la procédure ou lorsque vous retirez votre consentement'],
              ['Factures et justificatifs de paiement', 'Aussi longtemps que l’exige la législation fiscale (jusqu’à 10 ans)'],
              ['Candidatures qui n’aboutissent pas à un contrat', '6 mois après la candidature'],
            ],
          },
        },
      ],
    },
    {
      title: '7. Vos droits',
      blocks: [
        'Vous pouvez nous adresser une demande à tout moment en écrivant à contact@aah.education. Nous vérifions que la demande émane bien de vous et y répondons sans délai, au plus tard dans un délai d’un mois.',
        {
          list: [
            'accès à vos données et obtention d’une copie ;',
            'rectification des données inexactes ;',
            'effacement, sauf lorsque la loi nous oblige à les conserver ;',
            'limitation du traitement ou opposition au traitement ;',
            'réception de vos données dans un format portable ;',
            'retrait de votre consentement (sans effet sur le traitement effectué avant le retrait) ;',
            'introduction d’une réclamation auprès de l’autorité de protection des données de votre pays.',
          ],
        },
      ],
    },
    {
      title: '8. Sécurité',
      blocks: [
        'Nous protégeons vos données contre la perte, l’utilisation abusive, l’accès non autorisé et la modification :',
        {
          list: [
            '**Connexions chiffrées :** notre site fonctionne uniquement en HTTPS (TLS).',
            '**Mots de passe :** lorsque votre page personnelle de candidature sera mise en service, les mots de passe ne sont jamais stockés sous une forme lisible, uniquement sous forme de hachage irréversible (scrypt). Personne chez aah! education ne peut voir votre mot de passe. Il vous sera demandé de changer votre premier mot de passe temporaire.',
            '**Protection de la connexion :** après plusieurs mots de passe erronés, la connexion est bloquée pendant un certain temps. Votre session est conservée dans un cookie sécurisé que les scripts de la page ne peuvent pas lire.',
            '**Documents :** les fichiers que vous envoyez sont stockés chiffrés dans un espace de stockage non public situé dans l’UE. Les liens de téléchargement sont créés uniquement pour vous et restent valables quelques minutes.',
            '**Accès limité :** seuls les membres du personnel qui ont besoin de vos données pour leur travail peuvent les consulter.',
            '**Incidents :** en cas de violation de données, nous la notifions à l’autorité de contrôle dans les 72 heures, comme l’exige la loi, et vous en informons sans délai si elle présente un risque élevé pour vous.',
          ],
        },
        '**Ce que nous vous demandons :** ne communiquez pas votre mot de passe. Nous ne vous demandons jamais votre mot de passe par e-mail ou par téléphone. Si vous recevez un e-mail indiquant que nos coordonnées bancaires ont changé, vérifiez auprès de nous avant d’effectuer tout virement.',
      ],
    },
    {
      title: '9. Cookies',
      blocks: [
        'Notre site utilise des cookies nécessaires pour vos préférences de langue et de devise et, sur votre page personnelle, pour maintenir votre connexion. Les cookies de statistiques de visite (Google Analytics) ne sont utilisés que si vous les acceptez dans le bandeau cookies.',
      ],
    },
    {
      title: '10. Informations publiées sur ce site',
      blocks: [
        {
          list: [
            'Nous rassemblons les informations de ce site avec soin, mais nous ne pouvons pas garantir qu’elles sont complètes, exactes ou à jour. Nous vérifions les informations sur les écoles en les visitant et en les interrogeant directement, et les informations sur les visas auprès des autorités officielles, mais les unes comme les autres changent souvent. Veuillez les utiliser comme référence pour choisir une école.',
            'Sauf faute de notre part, nous ne sommes pas responsables des erreurs figurant sur ce site ni des litiges entre utilisateurs et tiers résultant de son utilisation.',
            'Le contenu de ce site peut être modifié ou supprimé sans préavis.',
            'Lorsque notre responsabilité est engagée, elle est limitée aux dommages directs et prévisibles, sauf en cas de faute intentionnelle ou de négligence grave de notre part.',
            'Nous ne sommes pas responsables des dommages causés par des virus, du piratage, des catastrophes naturelles ou d’autres causes que des précautions ordinaires ne permettent pas d’éviter.',
          ],
        },
      ],
    },
    {
      title: '11. Modification de la présente politique',
      blocks: ['Si nous modifions la présente politique, nous publions la nouvelle version sur cette page avec sa date d’entrée en vigueur et vous informons par e-mail des modifications importantes.'],
    },
    {
      title: 'Contact',
      blocks: ['aah! education Europe · contact@aah.education'],
    },
  ],
};

export default doc;
