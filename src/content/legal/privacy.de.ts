// 개인정보·보안 정책 독일어 본문(영어 privacy.en.ts 번역)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Datenschutzerklärung',
  metaDescription: 'Wie aah! education Ihre personenbezogenen Daten erhebt, verwendet und schützt.',
  title: 'Datenschutz- und Sicherheitsrichtlinie',
  effective: 'Gültig ab: 1. September 2026',
  intro: [
    'Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Als Unternehmen, das Anmeldungen für Auslandsaufenthalte bearbeitet, halten wir uns an die geltenden Datenschutzgesetze, einschließlich der EU-Datenschutz-Grundverordnung (DSGVO), und gehen sorgfältig mit Ihren Daten um.',
  ],
  sections: [
    {
      title: '1. Verantwortlicher',
      blocks: ['aah! education Europe („wir“, „uns“) ist für die Verarbeitung Ihrer personenbezogenen Daten verantwortlich. Sie erreichen uns unter contact@aah.education.', 'Postanschrift: aah! education Europe, Inhaber Hyun Woo Cho, Nicolaiweg 6, 65812 Bad Soden am Taunus, Deutschland.'],
    },
    {
      title: '2. Was personenbezogene Daten sind',
      blocks: [
        'Personenbezogene Daten sind alle Informationen, die Sie identifizieren, etwa Ihr Name, Ihre Anschrift, Telefonnummer oder Ihr Geburtsdatum. Auch Informationen, die Sie erst in Verbindung mit anderen Informationen identifizieren, sind personenbezogene Daten.',
      ],
    },
    {
      title: '3. Welche Daten wir erheben und warum',
      blocks: [
        {
          table: {
            head: ['Daten', 'Wann', 'Zweck', 'Rechtsgrundlage (DSGVO)'],
            rows: [
              ['Name, E-Mail, Telefonnummer, Geburtsdatum, Staatsangehörigkeit, Anschrift, höchster Abschluss, Wunschschule, Semester und Termine, Koreanisch-Niveau, Ihre Nachricht', 'Wenn Sie das Anmeldeformular absenden', 'Prüfung Ihrer Anmeldung, Erstellung Ihrer Anmeldebestätigung, Bewerbung bei der Schule, Rechnungsstellung', 'Vorvertragliche Maßnahmen auf Ihre Anfrage und Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)'],
              ['Ihre Antwort auf die Anmeldebestätigung (gewählte Option, Ihr Name, Datum und Uhrzeit, Anmerkungen)', 'Wenn Sie bestätigen', 'Dokumentation des Vertrags', 'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)'],
              ['Gesundheitliche Einschränkungen oder Allergien', 'Nur wenn Sie uns diese mitteilen', 'Anfrage der benötigten Unterstützung bei der Schule oder Unterkunft', 'Ihre ausdrückliche Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die Sie jederzeit widerrufen können'],
              ['Passkopie, Foto, Abschlusszeugnis, Visumkopie', 'Wenn Sie uns diese senden', 'Bewerbung bei der Schule und Visumberatung', 'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)'],
              ['Zahlungen und Rechnungen', 'Wenn Sie zahlen', 'Buchhaltung und Steuern', 'Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)'],
              ['Besuchsstatistiken (Cookies)', 'Wenn Sie die Website besuchen', 'Verbesserung der Website', 'Ihre Einwilligung im Cookie-Hinweis (Art. 6 Abs. 1 lit. a DSGVO)'],
            ],
          },
        },
        'Ohne die erforderlichen Angaben können wir die Leistung möglicherweise nicht erbringen. Wir verwenden Ihre Daten ohne Ihre Einwilligung nicht für andere Zwecke. Zur Verbesserung unseres Service können wir anonymisierte Statistiken verwenden, die Sie nicht mehr identifizieren.',
      ],
    },
    {
      title: '4. Wer Ihre Daten erhält',
      blocks: [
        {
          list: [
            '**Schulen und Wohnheime in Korea:** die Daten, die sie für Ihre Zulassung und Ihre Wohnheimbewerbung benötigen.',
            '**Dienstleister, die in unserem Auftrag tätig sind:** Server und Speicher (Amazon Web Services, Region Frankfurt, Deutschland), Website-Hosting (AWS Amplify), E-Mail (Google), Besuchsstatistiken (Google Analytics, nur mit Ihrer Einwilligung) und der Instagram-Feed auf unserer Website (Behold). Sie verarbeiten Daten nur nach unseren Weisungen.',
            'Andere nur, wenn Sie zustimmen oder uns darum bitten, wenn dies zum Schutz von Leben, Gesundheit oder Eigentum einer Person erforderlich ist und Ihre Einwilligung nicht eingeholt werden kann, oder wenn ein Gericht oder eine Behörde dies gesetzlich verlangt.',
          ],
        },
      ],
    },
    {
      title: '5. Übermittlungen außerhalb der EU',
      blocks: [
        'Für die Bewerbung bei Ihrer Schule übermitteln wir Ihre Daten in die Republik Korea. Die Europäische Kommission hat im Dezember 2021 beschlossen, dass Korea ein angemessenes Datenschutzniveau gewährleistet; das Vereinigte Königreich hat 2022 dieselbe Entscheidung getroffen. Für Übermittlungen in andere Länder verwenden wir die gesetzlich vorgeschriebenen Garantien, etwa Standardvertragsklauseln.',
      ],
    },
    {
      title: '6. Wie lange wir Ihre Daten speichern',
      blocks: [
        {
          table: {
            head: ['Daten', 'Speicherdauer'],
            rows: [
              ['Anmeldedaten, Bestätigung und Konto', '3 Jahre nach Vertragsende'],
              ['Von Ihnen gesendete Unterlagen (Reisepass, Foto, Abschlusszeugnis, Visum)', 'Löschung 6 Monate nach Abschluss des Verfahrens'],
              ['Gesundheitsdaten', 'Löschung bei Abschluss des Verfahrens oder bei Widerruf Ihrer Einwilligung'],
              ['Rechnungen und Zahlungsbelege', 'So lange, wie es das Steuerrecht verlangt (bis zu 10 Jahre)'],
              ['Anmeldungen, die nicht zu einem Vertrag führen', '6 Monate nach der Anmeldung'],
            ],
          },
        },
      ],
    },
    {
      title: '7. Ihre Rechte',
      blocks: [
        'Sie können jederzeit Folgendes verlangen, indem Sie an contact@aah.education schreiben. Wir prüfen, ob die Anfrage von Ihnen stammt, und antworten unverzüglich, spätestens innerhalb eines Monats.',
        {
          list: [
            'Auskunft über Ihre Daten und eine Kopie davon;',
            'Berichtigung unrichtiger Daten;',
            'Löschung, außer wenn wir gesetzlich zur Aufbewahrung verpflichtet sind;',
            'Einschränkung der Verarbeitung oder Widerspruch dagegen;',
            'Erhalt Ihrer Daten in einem übertragbaren Format;',
            'Widerruf Ihrer Einwilligung (die Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt);',
            'Beschwerde bei der Datenschutzaufsichtsbehörde Ihres Landes.',
          ],
        },
      ],
    },
    {
      title: '8. Sicherheit',
      blocks: [
        'Wir schützen Ihre Daten vor Verlust, Missbrauch, unbefugtem Zugriff und Veränderung:',
        {
          list: [
            '**Verschlüsselte Verbindungen:** Unsere Website funktioniert ausschließlich über HTTPS (TLS).',
            '**Passwörter:** Wenn Ihre persönliche Seite für Ihre Anmeldung freigeschaltet wird, werden Passwörter nie in lesbarer Form gespeichert, sondern nur als nicht umkehrbarer Hash (scrypt). Niemand bei aah! education kann Ihr Passwort sehen. Sie werden aufgefordert, Ihr erstes, vorläufiges Passwort zu ändern.',
            '**Login-Schutz:** Nach mehreren falschen Passworteingaben wird der Login vorübergehend gesperrt. Ihre Sitzung wird in einem sicheren Cookie gespeichert, das Skripte auf der Seite nicht lesen können.',
            '**Unterlagen:** Von Ihnen gesendete Dateien werden verschlüsselt in nicht öffentlichem Speicher in der EU abgelegt. Download-Links werden nur für Sie erstellt und sind wenige Minuten gültig.',
            '**Eingeschränkter Zugriff:** Nur Mitarbeitende, die Ihre Daten für ihre Arbeit benötigen, können sie einsehen.',
            '**Vorfälle:** Kommt es zu einer Datenschutzverletzung, melden wir diese wie gesetzlich vorgeschrieben innerhalb von 72 Stunden der Aufsichtsbehörde und informieren Sie unverzüglich, wenn sie ein hohes Risiko für Sie darstellt.',
          ],
        },
        '**Worum wir Sie bitten:** Geben Sie Ihr Passwort nicht weiter. Wir fragen niemals per E-Mail oder Telefon nach Ihrem Passwort. Wenn Sie eine E-Mail erhalten, in der steht, dass sich unsere Bankverbindung geändert hat, fragen Sie bitte bei uns nach, bevor Sie Geld überweisen.',
      ],
    },
    {
      title: '9. Cookies',
      blocks: [
        'Unsere Website verwendet notwendige Cookies für Ihre Sprach- und Währungseinstellungen sowie auf Ihrer persönlichen Seite, um Sie eingeloggt zu halten. Cookies für Besuchsstatistiken (Google Analytics) werden nur verwendet, wenn Sie diese im Cookie-Hinweis akzeptieren.',
      ],
    },
    {
      title: '10. Informationen auf dieser Website',
      blocks: [
        {
          list: [
            'Wir stellen die Informationen auf dieser Website sorgfältig zusammen, können jedoch nicht garantieren, dass sie vollständig, richtig oder aktuell sind. Schulinformationen überprüfen wir durch Besuche vor Ort und direkte Nachfrage bei den Schulen, Visuminformationen bei den zuständigen Behörden; beides ändert sich jedoch häufig. Bitte nutzen Sie sie als Orientierung bei der Schulwahl.',
            'Außer bei eigenem Verschulden sind wir nicht verantwortlich für Fehler auf dieser Website oder für Streitigkeiten zwischen Nutzern und Dritten, die sich aus ihrer Nutzung ergeben.',
            'Inhalte dieser Website können ohne Ankündigung geändert oder entfernt werden.',
            'Soweit wir haften, ist unsere Haftung auf unmittelbare und vorhersehbare Schäden beschränkt, es sei denn, wir haben vorsätzlich oder grob fahrlässig gehandelt.',
            'Wir sind nicht verantwortlich für Schäden durch Viren, Hackerangriffe, Naturkatastrophen oder andere Ursachen, die sich mit üblichen Vorsichtsmaßnahmen nicht verhindern lassen.',
          ],
        },
      ],
    },
    {
      title: '11. Änderungen dieser Richtlinie',
      blocks: ['Wenn wir diese Richtlinie ändern, veröffentlichen wir die neue Fassung mit ihrem Gültigkeitsdatum auf dieser Seite und informieren Sie per E-Mail über wichtige Änderungen.'],
    },
    {
      title: 'Kontakt',
      blocks: ['aah! education Europe · Inhaber: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Deutschland · contact@aah.education'],
    },
  ],
};

export default doc;
