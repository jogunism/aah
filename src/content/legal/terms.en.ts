// 이용약관·취소 정책 영어 본문(한국어 초안 docs/policy/terms.ko.md 기준, 다른 언어 번역의 원문)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Terms & Cancellation Policy',
  metaDescription: 'Terms of service and cancellation policy for Korean language course applications with aah! education.',
  title: 'Terms & Cancellation Policy',
  effective: 'Effective: 23 November 2026',
  intro: [
    'These terms apply to the application service for Korean language courses provided by aah! education Europe ("we", "us"). Please read them together with our Privacy Policy.',
  ],
  sections: [
    {
      title: '1. Scope',
      blocks: [
        'These terms apply when you ("the applicant") use our service to apply for a Korean language course and related services such as dormitory booking.',
        'Contracts you make through us with schools, dormitories or other providers are also subject to their own rules (for example their refund rules).',
      ],
    },
    {
      title: '2. Application and contract',
      blocks: [
        'Your application is received when you submit the application form on aah.education. You agree that we pass your application on to the school.',
        '**Submitting the form does not create a contract.** We review your application and send you an **application confirmation** with the price options and important information.',
        'The contract starts when you choose an option and confirm the application confirmation. The cancellation rules in section 7 apply from that moment.',
        'Please reply to the application confirmation **within 4 days**. If we do not hear from you by then, we may put your application on hold or close it.',
        'Applicants under 18 need the consent of a parent or legal guardian. We ask for it together with the confirmation.',
      ],
    },
    {
      title: '3. Who can apply',
      blocks: [
        {
          list: [
            'You meet the admission requirements of the school and course (age, education, qualifications and so on).',
            'Neither you nor anyone living with you is a member of, or has dealings with, a criminal organisation.',
          ],
        },
      ],
    },
    {
      title: '4. When we may decline an application',
      blocks: [
        {
          list: [
            'You clearly do not meet the admission requirements.',
            'You are under 18 and do not have the consent of a parent or guardian.',
            'The necessary steps cannot be completed before the school’s deadline.',
            'We contact you by phone or email and do not receive a reply by the date we gave.',
            'We consider that your health does not allow you to study abroad.',
            'The application appears to be made for a purpose other than studying.',
            'You concealed a previous entry refusal, visa refusal, deportation or criminal record, or we otherwise consider the application inappropriate.',
          ],
        },
      ],
    },
    {
      title: '5. Fees and payment',
      blocks: [
        'We invoice our service fee together with the fees of the school, the dormitory and other providers, and pay these providers on your behalf.',
        'Please pay by bank transfer to the account we give you. **Bank charges are paid by you.** Always include your application number as the payment reference.',
        'Once we receive your payment, we email you an invoice.',
        'If you do not pay by the deadline, we may terminate the contract (section 8).',
      ],
    },
    {
      title: '6. Changes to the amount',
      blocks: [
        {
          list: [
            'If a school or dormitory changes its fees, you pay the difference.',
            'If a school sets a special price, it must be paid by the school’s deadline.',
            'Fees for exceptional extra support that you asked for are not changed or refunded once paid.',
            'After the contract starts, the programme may change because of new rules of the school or of Korea. Dormitory fees may change with the number of days in a term.',
            'If exchange rates change sharply, or the amount changes significantly because of natural disasters, war, riots or government orders while we prepare your application, you may have to pay the difference.',
          ],
        },
      ],
    },
    {
      title: '7. Cancellation by you and refunds',
      blocks: [
        'You can cancel at any time. Please tell us by email (contact@aah.education) or by post. The date of cancellation is the business day on which **we receive** your notice.',
        'Before you confirm the application confirmation, you can cancel free of charge.',
        'After that, we refund the following part of **our service fee** (long-term course €450, short-term course €350):',
        {
          table: {
            head: ['When you cancel', 'Refund – long-term course', 'Refund – short-term course'],
            rows: [
              ['Before you confirm the application confirmation', 'Nothing has been paid yet', 'Nothing has been paid yet'],
              ['After you confirm the application confirmation', '€380', '€260'],
              ['From day 7 after your confirmation', '€340', '€210'],
              ['After we have submitted your application to the school', '€310', '€170'],
              ['After the school procedure is completed or your accommodation is confirmed', 'No refund', 'No refund'],
            ],
          },
        },
        '"School procedure completed" means that you have applied, been admitted and your tuition has been paid.',
        'Tuition and dormitory fees are refunded according to the rules of the school and the dormitory (section 10). Bank charges for refunds are paid by you.',
        '**Right of withdrawal (EU, EEA and UK consumers):** you can withdraw from the contract within 14 days of confirming the application confirmation without giving a reason. When you confirm, you ask us to start right away. If you then withdraw within the 14 days, you pay an amount in proportion to the services we have already provided, but never more than the amounts kept under the table above.',
        '**Force majeure:** if natural disasters, war, riots, government orders or similar events make the service impossible, or very likely to become impossible, you can cancel without any charge.',
        'We do not accept cancellations through us for the following personal reasons: dissatisfaction with the school’s environment, location, facilities or lessons; with teachers, staff or other students; with the course, class or level you were placed in; with people you live with; or with the accommodation’s environment, location or facilities. Such cases follow the rules of the school or accommodation.',
      ],
    },
    {
      title: '8. Termination by us',
      blocks: [
        'We may terminate the contract after giving you notice if:',
        {
          list: [
            'you gave false information;',
            'illness or other reasons make it impossible for you to take part in the programme;',
            'you or people connected to you cause trouble for other customers or disrupt our work, or are very likely to do so;',
            'natural disasters, war, riots, transport accidents, government orders or other reasons outside our control make the service impossible;',
            'you do not send the documents we need by the deadline;',
            'we cannot reach you for a long time;',
            'you do not pay by the deadline;',
            'abusive or threatening behaviour makes it impossible for us to handle your application.',
          ],
        },
      ],
    },
    {
      title: '9. Changes to your plans',
      blocks: [
        {
          table: {
            head: ['Change', 'Conditions', 'Long-term course', 'Short-term course'],
            rows: [
              ['Postpone to the next term at the same school', 'The school allows it, it is the next term without a gap (or the one after, if the school allows), and no refund is involved', 'Free, once', 'Free, once (before we apply to the school)'],
              ['Postponement that involves settling tuition already paid', '', '€40', '€50'],
              ['Other postponements (a second postponement, a term with a gap, or a school that does not allow it)', 'Treated as a cancellation (section 7) and a new application', 'Service fee for the new application reduced by €40', 'Service fee for the new application reduced by €50'],
              ['Change to another school', 'Within 7 days of your confirmation', 'Free', 'Free'],
              ['Change to another school', 'From day 7, before we submit your application', '€40', '€50'],
              ['Change to another school', 'After we submit your application', '€70', '€90'],
            ],
          },
        },
        'If changing the school also changes your accommodation, accommodation costs follow section 10. Postponing a short-term course by more than 3 months is treated as a cancellation unless the school allows it.',
      ],
    },
    {
      title: '10. Tuition and accommodation refunds',
      blocks: [
        {
          list: [
            'Tuition already paid is refunded according to the school’s refund rules. If we apply for and receive the refund on your behalf, we charge a handling fee of €40 (long-term) or €50 (short-term) plus bank charges and other actual costs.',
            'Dormitory fees are refunded according to the rules of the school’s dormitory.',
            'Other accommodation booked through us follows the conditions we tell you when booking. Bookings at a discounted rate, and stays that have started, are generally not refundable.',
            'We do not charge a fee for cancelling accommodation before you arrive; bank charges for the refund are paid by you.',
          ],
        },
      ],
    },
    {
      title: '11. Cancellation for reasons outside our control',
      blocks: [
        'If a programme is stopped or changed for reasons we are not responsible for, or you cannot take part because a flight is cancelled or delayed, tuition and accommodation are refunded as far as the school’s and accommodation’s rules allow, and our service fee is not refunded. Flights, accommodation and other services that we did not book must be cancelled by you.',
      ],
    },
    {
      title: '12. Limitation of liability',
      blocks: [
        'We are not responsible for:',
        {
          list: [
            'events outside our control, such as natural disasters, fire, strikes, epidemics, war, terrorism, the bankruptcy or accidents of schools, accommodation or transport providers, courses that do not open, changes to fees or conditions, and changes to visa or entry rules;',
            'damage that arises from reasons we are not responsible for;',
            'not obtaining a flight, passport or visa, or being refused entry to Korea. Visas are decided by the Korean consulate;',
            'complaints listed at the end of section 7;',
            'disputes with the school after you start the course, or with your accommodation. You need to settle these yourself, but we help as far as we can. If the school arranged your accommodation, please settle it directly with the school;',
            'results of tests at the school, a school stopping your course because it finds you unsuitable, or the content of the course itself;',
            'tasks we pass on to partner companies, unless the damage is caused by our intent or negligence.',
          ],
        },
        'If, after you apply, it turns out that we cannot arrange your place because of your qualifications or abilities, we refund you under this policy, unless this is because you gave false information.',
        'Nothing in these terms limits our liability where the law does not allow it to be limited.',
      ],
    },
    {
      title: '13. Prohibited conduct',
      blocks: [
        'The following is not allowed. If it happens, we may claim damages:',
        {
          list: [
            'conduct contrary to public order or morals;',
            'crimes or taking part in them;',
            'breaking the law;',
            'infringing the intellectual property of us or others;',
            'infringing the property or privacy of us or others;',
            'harming us or others;',
            'insults, defamation, threats, abusive language or violence;',
            'disrupting our work or damaging trust in us.',
          ],
        },
      ],
    },
    {
      title: '14. Personal data',
      blocks: ['We handle your personal data as described in our Privacy Policy.'],
    },
    {
      title: '15. Other matters',
      blocks: [
        'Questions that these terms do not answer are settled by good-faith discussion between you and us.',
        'These terms are governed by German law.',
        'If you are a consumer, the mandatory consumer protection rules of your country of residence always apply.',
      ],
    },
    {
      title: '16. Changes to these terms',
      blocks: [
        'We may update these terms. New terms apply to contracts confirmed after their effective date; contracts already confirmed keep the terms that applied when you confirmed.',
      ],
    },
    {
      title: 'Contact',
      blocks: ['aah! education Europe · Owner: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Germany · contact@aah.education'],
    },
  ],
};

export default doc;
