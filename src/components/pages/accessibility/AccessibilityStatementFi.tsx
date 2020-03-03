import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  hyphens: auto;
`;

const AccessibilityStatementFi: FunctionComponent = () => {
  return (
    <ContentWrapper lang="fi">
      <h1>Saavutettavuus&shy;seloste</h1>
      <p>
        Tämä saavutettavuusseloste koskee Helsingin kaupungin Kulttuurin kummilapset-verkkosivustoa.
        Sivuston osoite on https://puistotalkoot.hel.fi
      </p>
      <h2>Sivustoa koskevat lain säädökset</h2>
      <p>
        Tämä sivusto on julkaistu 23.9.2018 jälkeen. Sivuston tulee täyttää lain edellyttämät
        saavutettavuuden vaatimukset.
      </p>
      <h2>Kaupungin tavoite</h2>
      <p>
        Digitaalisten palveluiden saavutettavuudessa Helsingin tavoitteena on pyrkiä vähintään WCAG
        ohjeiston mukaiseen AA- tai sitä parempaan tasoon, mikäli se on kohtuudella mahdollista.
      </p>
      <h2>Vaatimustenmukaisuustilanne</h2>
      <p>Tämän verkkosivuston saavutettavuuden vaatimustenmukaisuutta ei ole vielä arvioitu.</p>
      <h2>Saavutettavuusselosteen laatiminen</h2>
      <p>Tämä seloste on laadittu 30.1.2020</p>
      <h3>Saavutettavuusselosteen päivittäminen</h3>
      <p>
        Saavutettavuusseloste päivitetään vastaamaan saavutettavuuden vaatimustenmukaisuudesta
        tehtyjä havaintoja suoritetun tarkastuksen jälkeen.
      </p>
      <h3>Tietojen pyytäminen saavutettavassa muodossa</h3>
      <p>
        Mikäli käyttäjä ei koe saavansa sivuston sisältöä saavutettavassa muodossa, voi käyttäjä
        pyytää näitä tietoja sähköpostilla{' '}
        <a href="mailto:helsinki.palaute@hel.fi">helsinki.palaute@hel.fi</a> tai palautelomakkeella{' '}
        <a href="https://hel.fi/palaute">hel.fi/palaute</a>. Tiedusteluun pyritään vastaamaan
        kohtuullisessa ajassa.
      </p>
      <h2>Helsingin kaupunki ja saavutettavuus </h2>
      <p>
        Helsingin kaupungin tavoitteena on olla kaikille esteetön ja saavutettava kaupunki.
        Kaupungin tavoitteena on, että Helsingissä on kaikkien kaupunkilaisten mahdollisimman helppo
        liikkua ja toimia ja että kaikki sisältö ja palvelut olisivat kaikkien saavutettavissa.
      </p>
      <p>
        Kaupunki edistää digitaalisten palveluiden saavutettavuutta yhdenmukaistamalla julkaisutyötä
        ja järjestämällä saavutettavuuteen keskittyvää koulutusta henkilökunnalleen.
      </p>
      <p>
        Sivustojen saavutettavuuden tasoa seurataan jatkuvasti sivustoja ylläpidettäessä.
        Havaittuihin puutteisiin reagoidaan välittömästi. Tarvittavat muutokset pyritään
        suorittamaan mahdollisimman nopeasti.
      </p>
      <h3>Vammaiset ja avustavien teknologioiden käyttäjät</h3>
      <p>
        Kaupunki tarjoaa neuvontaa ja tukea vammaisille ja avustavien teknologioiden käyttäjille.
        Tukea on saatavilla kaupungin sivuilla ilmoitetuilta neuvontasivuilta sekä
        puhelinneuvonnasta.
      </p>
      <h2>Saavutettavuusselosteen hyväksyntä</h2>
      <p>Tämän selosteen on hyväksynyt 30.1.2020</p>
      <p>
        Kulttuurin ja vapaa-ajan toimiala
        <br />
        Helsingin kaupunki
      </p>
    </ContentWrapper>
  );
};

export default AccessibilityStatementFi;
