// @flow
import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import Layout from '../layout/Layout';
import Input from '../form/Input';
import Select from '../form/Select';
import Checkbox from '../form/Checkbox';
import Radio from '../form/Radio';

const FormContainer = styled.div`
  padding: 2em;
  padding-top: 1em;
  margin-bottom: 4em;
  margin-left: 7em;
  margin-right: 7em;
  background-color: ${props => props.theme.helWhite};
`;

const TitleContainer = styled.div`
  margin-bottom: 1em;
  padding: 1em;
  padding-left: 7em;
  background-color: ${props => props.theme.helWhite};
`;

const NewEventPage = () => (
  <Layout>
    <TitleContainer>
      <h2>Ilmoita uusi vapaaehtoistapahtuma</h2>
    </TitleContainer>
    <FormContainer>
      <Formik onSubmit={console.debug}>
        {props => {
          const { values, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} noValidate>
              <h3>Tapahtuman nimi ja kuvaus</h3>
              <Input
                type="text"
                id="name"
                label="Nimi"
                placeholder="Nimi"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="textarea"
                id="description"
                label="Kuvausteksti"
                placeholder="Kuvausteksti"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h3>Paikka ja aika</h3>
              <Select
                id="area"
                label="Alue/Talkoopiiri"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="10">Helsingin keskusta</option>
                <option value="12">Punavuori</option>
                <option value="13">Kaartinkaupunki</option>
                <option value="14">Kaivopuisto</option>
                <option value="15">Eira</option>
                <option value="16">Katajanokka</option>
                <option value="17">Kruununhaka</option>
                <option value="18">Ruoholahti</option>
                <option value="20">Lauttasaari</option>
                <option value="21">Vattuniemi</option>
                <option value="24">Länsi-Pasila</option>
                <option value="25">Taka-Töölö</option>
                <option value="26">Keski-Töölö</option>
                <option value="27">Pohjois-Meilahti</option>
                <option value="28">Ruskeasuo</option>
                <option value="29">Meilahden sairaala-alue</option>
                <option value="30">Pikku-Huopalahti</option>
                <option value="31">Kivihaka</option>
                <option value="32">Etelä-Haaga</option>
                <option value="33">Munkkiniemi</option>
                <option value="34">Kuusisaari-Lehtisaari</option>
                <option value="35">Munkkivuori-Niemenmäki</option>
                <option value="38">Pitäjänmäen teollisuusalue</option>
                <option value="40">Pohjois-Haaga</option>
                <option value="44">Lassila</option>
                <option value="50">Sörnäinen</option>
                <option value="51">Etu-Vallila</option>
                <option value="52">Itä-Pasila</option>
                <option value="53">Kallio</option>
                <option value="55">Vallila</option>
                <option value="57">Kulosaari</option>
                <option value="61">Käpylä</option>
                <option value="66">Länsi-Pakila</option>
                <option value="67">Paloheinä</option>
                <option value="68">Itä-Pakila</option>
                <option value="83">Tammisalo</option>
                <option value="85">Jollas</option>
                <option value="36">Pajamäki</option>
                <option value="37">Reimarla</option>
                <option value="39">Konala</option>
                <option value="41">Malminkartano</option>
                <option value="42">Kannelmäki</option>
                <option value="43">Maununneva</option>
                <option value="56">Toukola Vanha Kaupunki</option>
                <option value="60">Koskela</option>
                <option value="62">Metsälä Etelä-Oulunkylä</option>
                <option value="63">Maunula Suursuo</option>
                <option value="64">Pakila Oulunkylä</option>
                <option value="65">Veräjämäki</option>
                <option value="70">Malmi</option>
                <option value="72">Pukinmäki Savela</option>
                <option value="78">Tapaninvainio</option>
                <option value="79">Viikki</option>
                <option value="80">Herttoniemi</option>
                <option value="84">Laajasalo</option>
                <option value="87">Etelä-Laajasalo</option>
                <option value="19">Suomenlinna</option>
                <option value="58">Sörnäinen</option>
                <option value="69">Torpparinmäki</option>
                <option value="71">Pihlajamäki</option>
                <option value="73">Tapanila</option>
                <option value="74">Siltamäki</option>
                <option value="75">Puistola</option>
                <option value="76">Suurmetsä</option>
                <option value="77">Jakomäki</option>
                <option value="82">Roihuvuori</option>
                <option value="86">Santahamina</option>
                <option value="88">Roihupellon teoll.alue</option>
                <option value="90">Puotinharju</option>
                <option value="91">Puotila</option>
                <option value="92">Myllypuro</option>
                <option value="93">Marjaniemi Itäkeskus</option>
                <option value="94">Kontula</option>
                <option value="95">Vartioharju</option>
                <option value="96">Pohjois-Vuosaari</option>
                <option value="97">Mellunkylä</option>
                <option value="98">Etelä-Keskivuosaari</option>
                <option value="99">Aurinkolahti</option>
              </Select>
              <Input
                type="text"
                id="startdate"
                label="Tapahtuma alkaa"
                placeholder="pp.kk.vvvv"
                value={values.startdate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="starttime"
                label="Kellonaika"
                placeholder="tt:mm"
                value={values.starttime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="enddate"
                label="Tapahtuma päättyy"
                placeholder="pp.kk.vvvv"
                value={values.enddate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="endtime"
                label="Kellonaika"
                placeholder="tt:mm"
                value={values.enddate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h3>Yhteyshenkilö</h3>
              <span>Järjestäjän yhteystiedot tarvitaan urakoitsijoita varten</span>
              <Input
                type="text"
                id="first_name"
                label="Etunimi"
                placeholder="Etunimi"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="last_name"
                label="Sukunimi"
                placeholder="Sukunimi"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="email"
                label="Sähköposti"
                placeholder="Sähköposti"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="phone"
                label="Puhelinnumero"
                placeholder="Puhelinnumero"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Näytetäänkö yhteystiedot julkisesti kartalla ja tapahtuman omalla sivulla</span>
              <Checkbox
                id="show_contact_details"
                label="Näytä yhteystiedot"
                value={values.show_contact_details}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h3>Muut tiedot</h3>
              <Input
                type="text"
                id="amount_of_volunteers"
                label="Arvioitu osallistujamäärä"
                placeholder="Osallistujamäärä"
                value={values.amount_of_volunteers}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="cleaning_targets"
                label="Siivouskohteet"
                placeholder="Siivouskohteet"
                value={values.cleaning_targets}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="trash_location"
                label="Sijainti, johon tarvikkeet ja roskat kerätään"
                placeholder="Sijainti"
                value={values.trash_location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="textarea"
                id="details"
                label="Lisätiedot"
                placeholder="Lisätiedot"
                value={values.details}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h3>Työkalut ja tarvikkeet</h3>
              <span>
                Ilmoita tarvittavat työkalut. Urakoitsijat hoitavat määrän tarvikkeita paikan
                päälle.
              </span>
              <Checkbox
                id="container"
                label="Siirtolava"
                value={values.container}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="trash_bags"
                label="75 litran jätesäkkejä"
                placeholder="Kappaletta"
                value={values.trash_bags}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                type="text"
                id="trash_pickers"
                label="Roskapihtejä"
                placeholder="Kappaletta"
                value={values.trash_pickers}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h3>Näkyvyys</h3>
              <span>Näytetäänkö tapahtuma julkisesti vai ei</span>
              <Radio
                id="visibility_yes"
                label="Julkinen"
                name="visibility"
                value={values.visibility_yes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Radio
                id="visibility_no"
                label="Salattu"
                name="visibility"
                value={values.visibility_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h3>Hintatiedot</h3>
              <span>Tapahtuma on kaupunkilaisille maksuton</span>
              <Checkbox
                id="free"
                label="Maksuton"
                value={values.free}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </form>
          );
        }}
      </Formik>
    </FormContainer>
  </Layout>
);

export default NewEventPage;
