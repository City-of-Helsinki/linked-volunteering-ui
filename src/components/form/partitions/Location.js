import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Select from '../fields/Select';
import Map from '../fields/Map';

export default ({ errors, touched, values, handleChange, handleBlur }) => (
  <Fragment>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 4, offset: 1 }}>
        <Select
          id="area"
          label="form.event.field.area.label"
          required
          error={errors.area}
          touched={touched.area}
          value={values.area}
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
      </Col>
    </Row>
    <Row>
      <Col sm="10" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
        <Map
          id="location"
          error={errors.location}
          handleChange={handleChange}
          value={values.location}
        />
      </Col>
    </Row>
  </Fragment>
);
