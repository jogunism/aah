// 이용약관·취소 정책 독일어 본문(영어 terms.en.ts 번역)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'AGB & Stornobedingungen',
  metaDescription: 'Allgemeine Geschäftsbedingungen und Stornobedingungen für Anmeldungen zu Koreanischkursen über aah! education.',
  title: 'AGB & Stornobedingungen',
  effective: 'Gültig ab: 1. September 2026',
  intro: [
    'Diese Bedingungen gelten für den Anmeldeservice für Koreanischkurse von aah! education Europe („wir“, „uns“). Bitte lesen Sie sie zusammen mit unserer Datenschutzerklärung.',
  ],
  sections: [
    {
      title: '1. Geltungsbereich',
      blocks: [
        'Diese Bedingungen gelten, wenn Sie („die anmeldende Person“) unseren Service nutzen, um sich zu einem Koreanischkurs und zu damit verbundenen Leistungen wie einer Wohnheimbuchung anzumelden.',
        'Für Verträge, die Sie über uns mit Schulen, Wohnheimen oder anderen Anbietern schließen, gelten zusätzlich deren eigene Regeln (zum Beispiel deren Erstattungsregeln).',
      ],
    },
    {
      title: '2. Anmeldung und Vertrag',
      blocks: [
        'Ihre Anmeldung ist eingegangen, wenn Sie das Anmeldeformular auf aah.education absenden. Sie sind damit einverstanden, dass wir Ihre Anmeldung an die Schule weiterleiten.',
        '**Durch das Absenden des Formulars kommt kein Vertrag zustande.** Wir prüfen Ihre Anmeldung und senden Ihnen eine **Anmeldebestätigung** mit den Preisoptionen und wichtigen Informationen.',
        'Der Vertrag kommt zustande, wenn Sie eine Option wählen und die Anmeldebestätigung bestätigen. Ab diesem Zeitpunkt gelten die Stornoregeln in Abschnitt 7.',
        'Bitte antworten Sie auf die Anmeldebestätigung **innerhalb von 4 Tagen**. Hören wir bis dahin nichts von Ihnen, können wir Ihre Anmeldung zurückstellen oder schließen.',
        'Personen unter 18 Jahren benötigen die Zustimmung eines Elternteils oder des gesetzlichen Vormunds. Wir holen sie zusammen mit der Bestätigung ein.',
      ],
    },
    {
      title: '3. Wer sich anmelden kann',
      blocks: [
        {
          list: [
            'Sie erfüllen die Zulassungsvoraussetzungen der Schule und des Kurses (Alter, Bildungsabschluss, Qualifikationen usw.).',
            'Weder Sie noch eine mit Ihnen zusammenlebende Person gehören einer kriminellen Vereinigung an oder stehen mit einer solchen in Verbindung.',
          ],
        },
      ],
    },
    {
      title: '4. Wann wir eine Anmeldung ablehnen können',
      blocks: [
        {
          list: [
            'Sie erfüllen die Zulassungsvoraussetzungen offensichtlich nicht.',
            'Sie sind unter 18 Jahre alt und haben keine Zustimmung eines Elternteils oder Vormunds.',
            'Die notwendigen Schritte können nicht vor der Frist der Schule abgeschlossen werden.',
            'Wir kontaktieren Sie per Telefon oder E-Mail und erhalten bis zum genannten Termin keine Antwort.',
            'Wir sind der Ansicht, dass Ihr Gesundheitszustand einen Auslandsaufenthalt zum Studium nicht zulässt.',
            'Die Anmeldung scheint zu einem anderen Zweck als dem Studium zu erfolgen.',
            'Sie haben eine frühere Einreiseverweigerung, Visumablehnung, Abschiebung oder Vorstrafe verschwiegen, oder wir halten die Anmeldung aus anderen Gründen für unangemessen.',
          ],
        },
      ],
    },
    {
      title: '5. Gebühren und Zahlung',
      blocks: [
        'Wir stellen unsere Servicegebühr zusammen mit den Gebühren der Schule, des Wohnheims und anderer Anbieter in Rechnung und bezahlen diese Anbieter in Ihrem Namen.',
        'Bitte zahlen Sie per Banküberweisung auf das Konto, das wir Ihnen nennen. **Bankgebühren tragen Sie.** Geben Sie als Verwendungszweck immer Ihre Anmeldenummer an.',
        'Sobald Ihre Zahlung bei uns eingegangen ist, senden wir Ihnen eine Rechnung per E-Mail.',
        'Wenn Sie nicht fristgerecht zahlen, können wir den Vertrag kündigen (Abschnitt 8).',
      ],
    },
    {
      title: '6. Änderungen des Betrags',
      blocks: [
        {
          list: [
            'Ändert eine Schule oder ein Wohnheim die Gebühren, zahlen Sie die Differenz.',
            'Legt eine Schule einen Sonderpreis fest, muss dieser bis zur Frist der Schule bezahlt werden.',
            'Gebühren für außergewöhnliche zusätzliche Unterstützung, die Sie angefordert haben, werden nach der Zahlung weder geändert noch erstattet.',
            'Nach Vertragsbeginn kann sich das Programm aufgrund neuer Regeln der Schule oder Koreas ändern. Wohnheimgebühren können sich mit der Anzahl der Tage eines Semesters ändern.',
            'Ändern sich Wechselkurse stark oder ändert sich der Betrag erheblich aufgrund von Naturkatastrophen, Krieg, Unruhen oder behördlichen Anordnungen, während wir Ihre Anmeldung vorbereiten, müssen Sie gegebenenfalls die Differenz zahlen.',
          ],
        },
      ],
    },
    {
      title: '7. Stornierung durch Sie und Erstattungen',
      blocks: [
        'Sie können jederzeit stornieren. Bitte teilen Sie uns dies per E-Mail (contact@aah.education) oder per Post mit. Als Stornierungsdatum gilt der Werktag, an dem Ihre Mitteilung **bei uns eingeht**.',
        'Bevor Sie die Anmeldebestätigung bestätigen, können Sie kostenlos stornieren.',
        'Danach erstatten wir folgenden Anteil **unserer Servicegebühr** (Langzeitkurs {{eur:450}}, Kurzzeitkurs {{eur:350}}):',
        {
          table: {
            head: ['Zeitpunkt der Stornierung', 'Erstattung – Langzeitkurs', 'Erstattung – Kurzzeitkurs'],
            rows: [
              ['Bevor Sie die Anmeldebestätigung bestätigen', 'Es wurde noch nichts bezahlt', 'Es wurde noch nichts bezahlt'],
              ['Nachdem Sie die Anmeldebestätigung bestätigt haben', '{{eur:380}}', '{{eur:260}}'],
              ['Ab dem 7. Tag nach Ihrer Bestätigung', '{{eur:340}}', '{{eur:210}}'],
              ['Nachdem wir Ihre Bewerbung bei der Schule eingereicht haben', '{{eur:310}}', '{{eur:170}}'],
              ['Nach Abschluss des Schulverfahrens oder nach Bestätigung Ihrer Unterkunft', 'Keine Erstattung', 'Keine Erstattung'],
            ],
          },
        },
        'Die Beträge werden in der auf unserer Website gewählten Währung angezeigt und zum aktuellen Wechselkurs aus Euro umgerechnet. Maßgeblich sind die Beträge in Ihrer Anmeldebestätigung.',
        '„Abschluss des Schulverfahrens“ bedeutet, dass Sie sich beworben haben, zugelassen wurden und Ihre Studiengebühren bezahlt sind.',
        'Studiengebühren und Wohnheimgebühren werden nach den Regeln der Schule und des Wohnheims erstattet (Abschnitt 10). Bankgebühren für Erstattungen tragen Sie.',
        '**Widerrufsrecht (Verbraucher in der EU, im EWR und im Vereinigten Königreich):** Sie können den Vertrag innerhalb von 14 Tagen nach Bestätigung der Anmeldebestätigung ohne Angabe von Gründen widerrufen. Mit Ihrer Bestätigung verlangen Sie, dass wir sofort mit der Leistung beginnen. Widerrufen Sie dann innerhalb der 14 Tage, zahlen Sie einen Betrag, der dem Anteil der bereits erbrachten Leistungen entspricht, jedoch nie mehr als die nach der obigen Tabelle einbehaltenen Beträge.',
        '**Höhere Gewalt:** Wenn Naturkatastrophen, Krieg, Unruhen, behördliche Anordnungen oder vergleichbare Ereignisse die Leistung unmöglich machen oder sehr wahrscheinlich unmöglich machen werden, können Sie kostenlos stornieren.',
        'Stornierungen über uns aus folgenden persönlichen Gründen nehmen wir nicht an: Unzufriedenheit mit Umgebung, Lage, Einrichtungen oder Unterricht der Schule; mit Lehrkräften, Personal oder anderen Studierenden; mit dem Kurs, der Klasse oder dem Niveau, in das Sie eingestuft wurden; mit Mitbewohnerinnen und Mitbewohnern; oder mit Umgebung, Lage oder Einrichtungen der Unterkunft. In solchen Fällen gelten die Regeln der Schule bzw. der Unterkunft.',
      ],
    },
    {
      title: '8. Kündigung durch uns',
      blocks: [
        'Wir können den Vertrag nach vorheriger Mitteilung an Sie kündigen, wenn:',
        {
          list: [
            'Sie falsche Angaben gemacht haben;',
            'Krankheit oder andere Gründe Ihnen die Teilnahme am Programm unmöglich machen;',
            'Sie oder mit Ihnen verbundene Personen anderen Kundinnen und Kunden Probleme bereiten oder unsere Arbeit stören oder dies sehr wahrscheinlich tun werden;',
            'Naturkatastrophen, Krieg, Unruhen, Verkehrsunfälle, behördliche Anordnungen oder andere Gründe außerhalb unseres Einflussbereichs die Leistung unmöglich machen;',
            'Sie die von uns benötigten Unterlagen nicht fristgerecht einreichen;',
            'wir Sie über längere Zeit nicht erreichen können;',
            'Sie nicht fristgerecht zahlen;',
            'beleidigendes oder bedrohliches Verhalten es uns unmöglich macht, Ihre Anmeldung zu bearbeiten.',
          ],
        },
      ],
    },
    {
      title: '9. Änderungen Ihrer Pläne',
      blocks: [
        {
          table: {
            head: ['Änderung', 'Voraussetzungen', 'Langzeitkurs', 'Kurzzeitkurs'],
            rows: [
              ['Verschiebung auf das nächste Semester an derselben Schule', 'Die Schule erlaubt es, es ist das unmittelbar folgende Semester (oder das darauf folgende, wenn die Schule es erlaubt) und es ist keine Erstattung erforderlich', 'Einmalig kostenlos', 'Einmalig kostenlos (bevor wir Sie bei der Schule anmelden)'],
              ['Verschiebung, bei der bereits gezahlte Studiengebühren verrechnet werden müssen', '', '{{eur:40}}', '{{eur:50}}'],
              ['Andere Verschiebungen (eine zweite Verschiebung, ein Semester mit Unterbrechung oder eine Schule, die es nicht erlaubt)', 'Gilt als Stornierung (Abschnitt 7) und neue Anmeldung', 'Servicegebühr für die neue Anmeldung um {{eur:40}} reduziert', 'Servicegebühr für die neue Anmeldung um {{eur:50}} reduziert'],
              ['Wechsel zu einer anderen Schule', 'Innerhalb von 7 Tagen nach Ihrer Bestätigung', 'Kostenlos', 'Kostenlos'],
              ['Wechsel zu einer anderen Schule', 'Ab dem 7. Tag, bevor wir Ihre Bewerbung einreichen', '{{eur:40}}', '{{eur:50}}'],
              ['Wechsel zu einer anderen Schule', 'Nachdem wir Ihre Bewerbung eingereicht haben', '{{eur:70}}', '{{eur:90}}'],
            ],
          },
        },
        'Ändert sich durch den Schulwechsel auch Ihre Unterkunft, richten sich die Unterkunftskosten nach Abschnitt 10. Eine Verschiebung eines Kurzzeitkurses um mehr als 3 Monate gilt als Stornierung, sofern die Schule sie nicht erlaubt.',
      ],
    },
    {
      title: '10. Erstattung von Studiengebühren und Unterkunftskosten',
      blocks: [
        {
          list: [
            'Bereits gezahlte Studiengebühren werden nach den Erstattungsregeln der Schule erstattet. Wenn wir die Erstattung in Ihrem Namen beantragen und entgegennehmen, berechnen wir eine Bearbeitungsgebühr von {{eur:40}} (Langzeitkurs) bzw. {{eur:50}} (Kurzzeitkurs) zuzüglich Bankgebühren und sonstiger tatsächlicher Kosten.',
            'Wohnheimgebühren werden nach den Regeln des Wohnheims der Schule erstattet.',
            'Für andere über uns gebuchte Unterkünfte gelten die Bedingungen, die wir Ihnen bei der Buchung nennen. Buchungen zu einem ermäßigten Tarif und bereits begonnene Aufenthalte sind in der Regel nicht erstattungsfähig.',
            'Für die Stornierung einer Unterkunft vor Ihrer Ankunft berechnen wir keine Gebühr; Bankgebühren für die Erstattung tragen Sie.',
          ],
        },
      ],
    },
    {
      title: '11. Absage aus Gründen außerhalb unseres Einflussbereichs',
      blocks: [
        'Wird ein Programm aus Gründen, die wir nicht zu vertreten haben, eingestellt oder geändert, oder können Sie wegen eines gestrichenen oder verspäteten Fluges nicht teilnehmen, werden Studiengebühren und Unterkunftskosten erstattet, soweit es die Regeln der Schule und der Unterkunft zulassen; unsere Servicegebühr wird nicht erstattet. Flüge, Unterkünfte und andere Leistungen, die wir nicht gebucht haben, müssen Sie selbst stornieren.',
      ],
    },
    {
      title: '12. Haftungsbeschränkung',
      blocks: [
        'Wir haften nicht für:',
        {
          list: [
            'Ereignisse außerhalb unseres Einflussbereichs, etwa Naturkatastrophen, Brände, Streiks, Epidemien, Krieg, Terrorismus, Insolvenz oder Unfälle von Schulen, Unterkünften oder Verkehrsunternehmen, Kurse, die nicht zustande kommen, Änderungen von Gebühren oder Bedingungen sowie Änderungen der Visa- oder Einreisebestimmungen;',
            'Schäden aus Gründen, die wir nicht zu vertreten haben;',
            'das Nichterhalten eines Fluges, Reisepasses oder Visums oder eine Einreiseverweigerung nach Korea. Über Visa entscheidet das koreanische Konsulat;',
            'die am Ende von Abschnitt 7 genannten Beanstandungen;',
            'Streitigkeiten mit der Schule nach Kursbeginn oder mit Ihrer Unterkunft. Diese müssen Sie selbst klären, wir helfen jedoch, soweit wir können. Hat die Schule Ihre Unterkunft vermittelt, klären Sie dies bitte direkt mit der Schule;',
            'Ergebnisse von Tests an der Schule, den Abbruch Ihres Kurses durch die Schule, weil sie Sie für ungeeignet hält, oder den Inhalt des Kurses selbst;',
            'Aufgaben, die wir an Partnerunternehmen weitergeben, es sei denn, der Schaden beruht auf Vorsatz oder Fahrlässigkeit unsererseits.',
          ],
        },
        'Stellt sich nach Ihrer Anmeldung heraus, dass wir Ihnen aufgrund Ihrer Qualifikationen oder Fähigkeiten keinen Platz vermitteln können, erstatten wir Ihnen Beträge nach diesen Bedingungen, es sei denn, dies beruht darauf, dass Sie falsche Angaben gemacht haben.',
        'Nichts in diesen Bedingungen beschränkt unsere Haftung, soweit das Gesetz eine Beschränkung nicht zulässt.',
      ],
    },
    {
      title: '13. Verbotenes Verhalten',
      blocks: [
        'Folgendes ist nicht erlaubt. Kommt es dazu, können wir Schadensersatz verlangen:',
        {
          list: [
            'Verhalten, das gegen die öffentliche Ordnung oder die guten Sitten verstößt;',
            'Straftaten oder die Beteiligung daran;',
            'Gesetzesverstöße;',
            'die Verletzung geistigen Eigentums von uns oder Dritten;',
            'die Verletzung des Eigentums oder der Privatsphäre von uns oder Dritten;',
            'die Schädigung von uns oder Dritten;',
            'Beleidigungen, Verleumdungen, Drohungen, ausfallende Sprache oder Gewalt;',
            'die Störung unserer Arbeit oder die Schädigung des Vertrauens in uns.',
          ],
        },
      ],
    },
    {
      title: '14. Personenbezogene Daten',
      blocks: ['Wir verarbeiten Ihre personenbezogenen Daten wie in unserer Datenschutzerklärung beschrieben.'],
    },
    {
      title: '15. Sonstiges',
      blocks: [
        'Fragen, die diese Bedingungen nicht beantworten, werden in gutem Glauben zwischen Ihnen und uns geklärt.',
        'Für diese Bedingungen gilt deutsches Recht.',
        'Wenn Sie Verbraucher sind, gelten stets die zwingenden Verbraucherschutzvorschriften Ihres Wohnsitzlandes.',
      ],
    },
    {
      title: '16. Änderungen dieser Bedingungen',
      blocks: [
        'Wir können diese Bedingungen aktualisieren. Neue Bedingungen gelten für Verträge, die nach ihrem Inkrafttreten bestätigt werden; für bereits bestätigte Verträge gelten weiterhin die Bedingungen zum Zeitpunkt Ihrer Bestätigung.',
      ],
    },
    {
      title: 'Kontakt',
      blocks: ['aah! education Europe · Inhaber: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Deutschland · contact@aah.education'],
    },
  ],
};

export default doc;
