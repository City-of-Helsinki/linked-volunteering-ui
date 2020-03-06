import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  hyphens: auto;
`;

const AccessibilityStatementSv: FunctionComponent = () => {
  return (
    <ContentWrapper lang="sv">
      <h1>Tillgänglighets&shy;utlåtande</h1>
      <p>
        Detta tillgänglighetsutlåtande gäller Helsingfors stads webbplats Kulturens fadderbarn
        Webbplatsens adress är https://puistotalkoot.hel.fi
      </p>

      <h2>Lagbestämmelser som gäller webbplatsen</h2>
      <p>
        Denna webbplats har offentliggjorts efter 23.9.2018. Webbplatsen ska uppfylla lagens krav på
        tillgänglighet.
      </p>

      <h2>Stadens mål</h2>
      <p>
        När det gäller tillgänglighet till digitala tjänster har Helsingfors stad som mål att uppnå
        minst nivå AA eller bättre enligt WCAG-anvisningarna, om det är rimligt.
      </p>

      <h2>Fullgörandestatus</h2>
      <p>Denna webbplats förenlighet med tillgänglighetskraven är inte ännu bedömd.</p>

      <h2>Utarbetande av tillgänglighets&shy;utlåtande</h2>
      <p>Detta utlåtande har upprättats 30.1.2020</p>

      <h3>Uppdatering av tillgänglighetsutlåtande</h3>
      <p>
        Tillgänglighetsutlåtandet uppdateras till att motsvara de observationer som gjorts om
        överensstämmelse med tillgänglighetskraven efter att en granskning genomförts.
      </p>

      <h3>Begäran om uppgifter i tillgänglig form</h3>
      <p>
        Om användaren inte upplever sig få webbplatsens innehåll i tillgänglig form, kan användaren
        begära dessa uppgifter per e-post{' '}
        <a href="mailto:helsinki.palaute@hel.fi">helsinki.palaute@hel.fi</a> eller med
        responsformulär på <a href="https://hel.fi/palaute">www.hel.fi/palaute</a>. Strävan är att
        svara på förfrågan inom rimlig tid.
      </p>

      <h2>Helsingfors stad och tillgänglighet</h2>
      <p>
        Helsingfors stad har som mål att vara en tillgänglig stad för alla. Stadens mål är att det
        ska vara så lätt som möjligt för alla stadsbor att röra sig och verka i Helsingfors och att
        alla innehåll och tjänster ska vara tillgängliga för alla.
      </p>
      <p>
        Staden främjar tillgängligheten för digitala tjänster genom att förenhetliga
        publiceringsarbetet och ordna utbildning om tillgänglighet för sin personal.
      </p>
      <p>
        Tillgänglighetsnivån för webbplatser följs upp kontinuerligt när webbplatserna underhålls.
        Observerade brister hanteras omedelbart. Vår strävan är att genomföra nödvändiga ändringar
        så snabbt som möjligt.
      </p>

      <h3>Handikappade och hjälpmedelsanvändare</h3>
      <p>
        Staden erbjuder rådgivning och stöd för handikappade och hjälpmedelsanvändare. Stöd kan fås
        på de rådgivningssidor som anges på stadens sidor och på telefonrådgivningen.
      </p>

      <h2>Godkännande av tillgänglighets&shy;utlåtande</h2>
      <p>Detta utlåtande har godkänts 30.1.2020</p>
      <p>Kultur och fritid</p>
      <p>Helsingfors stad</p>
    </ContentWrapper>
  );
};

export default AccessibilityStatementSv;
