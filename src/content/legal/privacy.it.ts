// 개인정보·보안 정책 이탈리아어 본문(영어 privacy.en.ts 번역)
import type { LegalDoc } from './types';

const doc: LegalDoc = {
  metaTitle: 'Informativa sulla privacy',
  metaDescription: 'Come aah! education raccoglie, utilizza e protegge i tuoi dati personali.',
  title: 'Informativa sulla privacy e sulla sicurezza',
  effective: 'In vigore dal 1° settembre 2026',
  intro: [
    'Prendiamo sul serio la protezione dei tuoi dati personali. In quanto società che gestisce domande di studio all’estero, rispettiamo la normativa applicabile in materia di protezione dei dati, compreso il Regolamento generale sulla protezione dei dati dell’UE (GDPR), e trattiamo i tuoi dati con cura.',
  ],
  sections: [
    {
      title: '1. Titolare del trattamento',
      blocks: ['aah! education Europe («noi») è il titolare del trattamento dei tuoi dati personali. Puoi contattarci all’indirizzo contact@aah.education.', 'Indirizzo postale: aah! education Europe, titolare Hyun Woo Cho, Nicolaiweg 6, 65812 Bad Soden am Taunus, Germania.'],
    },
    {
      title: '2. Che cosa sono i dati personali',
      blocks: [
        'Sono dati personali tutte le informazioni che ti identificano, come il nome, l’indirizzo, il numero di telefono o la data di nascita. Sono dati personali anche le informazioni che ti identificano solo se combinate con altre informazioni.',
      ],
    },
    {
      title: '3. Quali dati raccogliamo e perché',
      blocks: [
        {
          table: {
            head: ['Dati', 'Quando', 'Finalità', 'Base giuridica (GDPR)'],
            rows: [
              ['Nome, e-mail, numero di telefono, data di nascita, cittadinanza, indirizzo, titolo di studio più alto, scuola preferita, semestre e date, livello di coreano, il tuo messaggio', 'Quando invii il modulo di iscrizione', 'Esame della domanda, preparazione della conferma della domanda, iscrizione presso la scuola, emissione delle fatture', 'Misure precontrattuali adottate su tua richiesta ed esecuzione del contratto (art. 6, par. 1, lett. b) GDPR)'],
              ['La tua risposta alla conferma della domanda (opzione scelta, nome, data e ora, osservazioni)', 'Quando accetti', 'Documentazione del contratto', 'Esecuzione del contratto (art. 6, par. 1, lett. b) GDPR)'],
              ['Condizioni di salute o allergie', 'Solo se ce le comunichi', 'Richiedere alla scuola o all’alloggio l’assistenza di cui hai bisogno', 'Il tuo consenso esplicito (art. 9, par. 2, lett. a) GDPR), che puoi revocare in qualsiasi momento'],
              ['Copia del passaporto, foto, diploma, copia del visto', 'Quando ce li invii', 'Iscrizione presso la scuola e assistenza per il visto', 'Esecuzione del contratto (art. 6, par. 1, lett. b) GDPR)'],
              ['Pagamenti e fatture', 'Quando paghi', 'Contabilità e adempimenti fiscali', 'Obbligo legale (art. 6, par. 1, lett. c) GDPR)'],
              ['Statistiche sulle visite (cookie)', 'Quando visiti il sito web', 'Miglioramento del sito web', 'Il tuo consenso tramite il banner dei cookie (art. 6, par. 1, lett. a) GDPR)'],
            ],
          },
        },
        'Senza le informazioni richieste potremmo non essere in grado di fornire il servizio. Non utilizziamo i tuoi dati per altre finalità senza il tuo consenso. Possiamo utilizzare statistiche anonimizzate, che non ti identificano più, per migliorare il nostro servizio.',
      ],
    },
    {
      title: '4. Chi riceve i tuoi dati',
      blocks: [
        {
          list: [
            '**Scuole e studentati in Corea:** i dati di cui hanno bisogno per la tua ammissione e per la domanda di studentato.',
            '**Fornitori di servizi che agiscono per nostro conto:** server e archiviazione (Amazon Web Services, regione di Francoforte, Germania), hosting del sito web (AWS Amplify), e-mail (Google), statistiche sulle visite (Google Analytics, solo con il tuo consenso) e il feed Instagram sul nostro sito web (Behold). Trattano i dati solo secondo le nostre istruzioni.',
            'Altri soggetti solo se acconsenti o ce lo chiedi, se è necessario per proteggere la vita, la salute o i beni di una persona e non è possibile ottenere il tuo consenso, oppure se un tribunale o un’autorità lo richiede per legge.',
          ],
        },
      ],
    },
    {
      title: '5. Trasferimenti al di fuori dell’UE',
      blocks: [
        'Per iscriverti alla scuola, trasferiamo i tuoi dati nella Repubblica di Corea. Nel dicembre 2021 la Commissione europea ha stabilito che la Corea garantisce un livello adeguato di protezione dei dati, e il Regno Unito ha adottato la stessa decisione nel 2022. Per i trasferimenti verso altri Paesi utilizziamo le garanzie previste dalla legge, come le clausole contrattuali tipo.',
      ],
    },
    {
      title: '6. Per quanto tempo conserviamo i tuoi dati',
      blocks: [
        {
          table: {
            head: ['Dati', 'Periodo di conservazione'],
            rows: [
              ['Dati della domanda, conferma e account', '3 anni dalla cessazione del contratto'],
              ['Documenti che ci invii (passaporto, foto, diploma, visto)', 'Cancellati 6 mesi dopo la conclusione della procedura'],
              ['Informazioni sulla salute', 'Cancellate alla conclusione della procedura o quando revochi il consenso'],
              ['Fatture e registrazioni dei pagamenti', 'Per il periodo previsto dalla normativa fiscale (fino a 10 anni)'],
              ['Domande che non portano a un contratto', '6 mesi dalla domanda'],
            ],
          },
        },
      ],
    },
    {
      title: '7. I tuoi diritti',
      blocks: [
        'Puoi esercitare in qualsiasi momento i seguenti diritti scrivendo a contact@aah.education. Verifichiamo che la richiesta provenga da te e rispondiamo senza ritardo, al più tardi entro un mese.',
        {
          list: [
            'accesso ai tuoi dati e copia degli stessi;',
            'rettifica dei dati inesatti;',
            'cancellazione, salvo i casi in cui la legge ci impone di conservarli;',
            'limitazione del trattamento od opposizione al trattamento;',
            'ricezione dei tuoi dati in un formato portabile;',
            'revoca del consenso (senza pregiudicare la liceità del trattamento effettuato prima della revoca);',
            'proposizione di un reclamo all’autorità di controllo per la protezione dei dati del tuo Paese.',
          ],
        },
      ],
    },
    {
      title: '8. Sicurezza',
      blocks: [
        'Proteggiamo i tuoi dati da perdita, uso improprio, accesso non autorizzato e modifiche:',
        {
          list: [
            '**Connessioni cifrate:** il nostro sito web funziona solo tramite HTTPS (TLS).',
            '**Password:** quando viene attivata la tua pagina personale della domanda, le password non vengono mai salvate in forma leggibile, ma solo come hash irreversibile (scrypt). Nessuno in aah! education può vedere la tua password. Ti verrà chiesto di cambiare la prima password temporanea.',
            '**Protezione dell’accesso:** dopo diversi tentativi con password errata, l’accesso viene bloccato per un certo periodo. La tua sessione viene mantenuta in un cookie sicuro che gli script della pagina non possono leggere.',
            '**Documenti:** i file che ci invii vengono conservati in forma cifrata in uno spazio di archiviazione non pubblico nell’UE. I link per il download vengono creati solo per te e sono validi per pochi minuti.',
            '**Accesso limitato:** solo il personale che ha bisogno dei tuoi dati per il proprio lavoro può vederli.',
            '**Incidenti:** in caso di violazione dei dati, la notifichiamo all’autorità di controllo entro 72 ore come previsto dalla legge e ti informiamo senza ritardo se comporta un rischio elevato per te.',
          ],
        },
        '**Che cosa ti chiediamo:** non condividere la tua password. Non ti chiederemo mai la password via e-mail o per telefono. Se ricevi un’e-mail in cui si afferma che le nostre coordinate bancarie sono cambiate, verifica con noi prima di effettuare qualsiasi bonifico.',
      ],
    },
    {
      title: '9. Cookie',
      blocks: [
        'Il nostro sito web utilizza cookie necessari per le impostazioni di lingua e valuta e, nella tua pagina personale, per mantenere l’accesso. I cookie per le statistiche sulle visite (Google Analytics) vengono utilizzati solo se li accetti nel banner dei cookie.',
      ],
    },
    {
      title: '10. Informazioni su questo sito web',
      blocks: [
        {
          list: [
            'Raccogliamo con cura le informazioni pubblicate su questo sito web, ma non possiamo garantire che siano complete, esatte o aggiornate. Verifichiamo le informazioni sulle scuole visitandole e chiedendo direttamente a loro, e le informazioni sui visti presso le autorità ufficiali, ma entrambe cambiano spesso. Utilizzale come riferimento nella scelta della scuola.',
            'Salvo i casi in cui la colpa sia nostra, non siamo responsabili per errori presenti su questo sito web né per controversie tra utenti e terzi derivanti dal suo utilizzo.',
            'I contenuti di questo sito web possono essere modificati o rimossi senza preavviso.',
            'Nei casi in cui siamo responsabili, la nostra responsabilità è limitata ai danni diretti e prevedibili, salvo dolo o colpa grave da parte nostra.',
            'Non siamo responsabili per danni causati da virus, attacchi informatici, calamità naturali o altre cause che le normali precauzioni non possono impedire.',
          ],
        },
      ],
    },
    {
      title: '11. Modifiche alla presente informativa',
      blocks: ['Se modifichiamo la presente informativa, pubblichiamo la nuova versione su questa pagina con la relativa data di entrata in vigore e ti informiamo via e-mail delle modifiche importanti.'],
    },
    {
      title: 'Contatti',
      blocks: ['aah! education Europe · Titolare: Hyun Woo Cho · Nicolaiweg 6, 65812 Bad Soden am Taunus, Germania · contact@aah.education'],
    },
  ],
};

export default doc;
