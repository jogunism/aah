// 개인정보·보안 정책 영어 본문(한국어 초안 docs/policy/privacy.ko.md 기준, 다른 언어 번역의 원문)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Privacy Policy',
  metaDescription: 'How aah! education collects, uses and protects your personal data.',
  title: 'Privacy & Security Policy',
  effective: 'Effective: 1 September 2026',
  intro: [
    'We take the protection of your personal data seriously. As a company that handles study-abroad applications, we follow the applicable data protection laws, including the EU General Data Protection Regulation (GDPR), and look after your data carefully.',
  ],
  sections: [
    {
      title: '1. Who is responsible',
      blocks: ['aah! education Europe ("we", "us") is responsible for processing your personal data. You can reach us at contact@aah.education.', 'Postal address: aah! education Europe, owner Hyun Woo Cho, Nicolaiweg 6, 65812 Bad Soden am Taunus, Germany.'],
    },
    {
      title: '2. What personal data is',
      blocks: [
        'Personal data is any information that identifies you, such as your name, address, phone number or date of birth. Information that identifies you only when combined with other information is personal data too.',
      ],
    },
    {
      title: '3. What we collect and why',
      blocks: [
        {
          table: {
            head: ['Data', 'When', 'Purpose', 'Legal basis (GDPR)'],
            rows: [
              ['Name, email, phone number, date of birth, nationality, address, highest diploma, preferred school, term and dates, Korean level, your message', 'When you submit the application form', 'Reviewing your application, preparing your application confirmation, applying to the school, issuing invoices', 'Steps at your request before a contract and performance of the contract (Art. 6(1)(b))'],
              ['Your reply to the application confirmation (chosen option, your name, date and time, remarks)', 'When you confirm', 'Record of the contract', 'Performance of the contract (Art. 6(1)(b))'],
              ['Health information', 'When you answer the health question in the application confirmation, or tell us otherwise', 'Checking whether your stay is possible, preparing school, dormitory and visa documents, and asking for the support you need', 'Your explicit consent (Art. 9(2)(a)), which you can withdraw at any time'],
              ['Passport copy, photo, diploma, visa copy', 'When you send them to us', 'School application and visa guidance', 'Performance of the contract (Art. 6(1)(b))'],
              ['Payments and invoices', 'When you pay', 'Accounting and tax', 'Legal obligation (Art. 6(1)(c))'],
              ['Visit statistics (cookies)', 'When you visit the website', 'Improving the website', 'Your consent in the cookie notice (Art. 6(1)(a))'],
            ],
          },
        },
        'Without the required information we may not be able to provide the service. We do not use your data for other purposes without your consent. We may use anonymised statistics that no longer identify you to improve our service.',
      ],
    },
    {
      title: '4. Who receives your data',
      blocks: [
        {
          list: [
            '**Schools and dormitories in Korea:** the data they need for your admission and dormitory application.',
            '**Service providers acting on our behalf:** servers and storage (Amazon Web Services, Frankfurt region, Germany), website hosting (AWS Amplify), email (Google), visit statistics (Google Analytics, only with your consent) and the Instagram feed on our website (Behold). They process data only on our instructions.',
            'Others only if you agree or ask us to, if it is necessary to protect someone’s life, health or property and your consent cannot be obtained, or if a court or authority requires it by law.',
          ],
        },
      ],
    },
    {
      title: '5. Transfers outside the EU',
      blocks: [
        'To apply to your school, we send your data to the Republic of Korea. The European Commission decided in December 2021 that Korea ensures an adequate level of data protection, and the United Kingdom made the same decision in 2022. For transfers to other countries we use the safeguards required by law, such as standard contractual clauses.',
      ],
    },
    {
      title: '6. How long we keep your data',
      blocks: [
        {
          table: {
            head: ['Data', 'Kept for'],
            rows: [
              ['Application data, confirmation and account', '3 years after the contract ends'],
              ['Documents you send (passport, photo, diploma, visa)', 'Deleted 6 months after the procedure ends'],
              ['Health information', 'Deleted when the procedure ends or when you withdraw your consent'],
              ['Invoices and payment records', 'As long as tax law requires (up to 10 years)'],
              ['Applications that do not lead to a contract', '6 months after the application'],
            ],
          },
        },
      ],
    },
    {
      title: '7. Your rights',
      blocks: [
        'You can ask us at any time, by writing to contact@aah.education. We check that the request comes from you and answer without delay, within one month at the latest.',
        {
          list: [
            'access to your data and a copy of it;',
            'correction of wrong data;',
            'deletion, except where the law requires us to keep it;',
            'restriction of, or objection to, processing;',
            'receiving your data in a portable format;',
            'withdrawing your consent (this does not affect processing before the withdrawal);',
            'lodging a complaint with the data protection authority of your country.',
          ],
        },
      ],
    },
    {
      title: '8. Security',
      blocks: [
        'We protect your data against loss, misuse, unauthorised access and changes:',
        {
          list: [
            '**Encrypted connections:** our website only works over HTTPS (TLS).',
            '**Passwords:** when your personal application page opens, passwords are never stored in readable form, only as an irreversible hash (scrypt). Nobody at aah! education can see your password. You will be asked to change your first temporary password.',
            '**Sign-in protection:** after several wrong passwords, sign-in is blocked for a while. Your session is kept in a secure cookie that scripts on the page cannot read.',
            '**Documents:** files you send are stored encrypted in non-public storage in the EU. Download links are created only for you and are valid for a few minutes.',
            '**Limited access:** only staff who need your data for their work can see it.',
            '**Incidents:** if a data breach occurs, we report it to the supervisory authority within 72 hours as required by law and inform you without delay if it puts you at high risk.',
          ],
        },
        '**What we ask of you:** do not share your password. We never ask for your password by email or phone. If you receive an email saying our bank details have changed, please check with us before you transfer any money.',
      ],
    },
    {
      title: '9. Cookies',
      blocks: [
        'Our website uses necessary cookies for your language and currency settings and, on your personal page, to keep you signed in. Cookies for visit statistics (Google Analytics) are used only if you accept them in the cookie notice.',
      ],
    },
    {
      title: '10. Information on this website',
      blocks: [
        {
          list: [
            'We collect the information on this website with care, but we cannot guarantee that it is complete, accurate or up to date. We check school information by visiting the schools and asking them directly, and visa information with the official authorities, but both change often. Please use it as a reference when choosing a school.',
            'Except where we are at fault, we are not responsible for errors on this website or for disputes between users and third parties that arise from using it.',
            'Content on this website may be changed or removed without notice.',
            'Where we are liable, our liability is limited to direct and foreseeable damage, unless we acted intentionally or with gross negligence.',
            'We are not responsible for damage caused by viruses, hacking, natural disasters or other causes that ordinary precautions cannot prevent.',
          ],
        },
      ],
    },
    {
      title: '11. Changes to this policy',
      blocks: ['If we change this policy, we publish the new version on this page with its effective date and inform you by email about important changes.'],
    },
    {
      title: 'Contact',
      blocks: ['aah! education Europe · Owner: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Germany · contact@aah.education'],
    },
  ],
};

export default doc;
