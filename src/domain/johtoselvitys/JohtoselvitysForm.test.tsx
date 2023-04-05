import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { render, cleanup, fireEvent, screen } from '../../testUtils/render';
import Johtoselvitys from '../../pages/Johtoselvitys';
import JohtoselvitysContainer from './JohtoselvitysContainer';
import { waitForLoadingToFinish } from '../../testUtils/helperFunctions';
import { server } from '../mocks/test-server';
import { HankeData } from '../types/hanke';
import hankkeet from '../mocks/data/hankkeet-data';
import { JohtoselvitysFormValues } from './types';

afterEach(cleanup);

jest.setTimeout(40000);

const application: JohtoselvitysFormValues = {
  id: null,
  alluStatus: null,
  applicationType: 'CABLE_REPORT',
  hankeTunnus: 'HAI22-2',
  applicationData: {
    applicationType: 'CABLE_REPORT',
    name: '',
    customerWithContacts: {
      customer: {
        type: null,
        name: '',
        country: '',
        postalAddress: {
          streetAddress: {
            streetName: '',
          },
          postalCode: '',
          city: '',
        },
        email: '',
        phone: '',
        registryKey: '',
        ovt: null,
        invoicingOperator: null,
        sapCustomerNumber: null,
      },
      contacts: [
        {
          email: '',
          name: '',
          orderer: true,
          phone: '',
          postalAddress: { city: '', postalCode: '', streetAddress: { streetName: '' } },
        },
      ],
    },
    areas: [
      {
        name: '',
        geometry: {
          type: 'Polygon',
          crs: {
            type: 'name',
            properties: {
              name: 'urn:ogc:def:crs:EPSG::3879',
            },
          },
          coordinates: [
            [
              [25498583.87, 6679281.28],
              [25498584.13, 6679314.07],
              [25498573.17, 6679313.38],
              [25498571.91, 6679281.46],
              [25498583.87, 6679281.28],
            ],
          ],
        },
      },
    ],
    startTime: null,
    endTime: null,
    identificationNumber: 'HAI-123',
    clientApplicationKind: 'HAITATON',
    workDescription: '',
    contractorWithContacts: {
      customer: {
        type: null,
        name: '',
        country: 'FI',
        postalAddress: {
          streetAddress: {
            streetName: '',
          },
          postalCode: '',
          city: '',
        },
        email: '',
        phone: '',
        registryKey: '',
        ovt: null,
        invoicingOperator: null,
        sapCustomerNumber: null,
      },
      contacts: [
        {
          email: '',
          name: '',
          orderer: false,
          phone: '',
          postalAddress: { city: '', postalCode: '', streetAddress: { streetName: '' } },
        },
      ],
    },
    postalAddress: null,
    representativeWithContacts: null,
    invoicingCustomer: null,
    customerReference: null,
    area: null,
    propertyDeveloperWithContacts: null,
    constructionWork: false,
    maintenanceWork: false,
    emergencyWork: false,
    propertyConnectivity: false,
    rockExcavation: null,
  },
};

function fillBasicInformation() {
  fireEvent.change(screen.getByLabelText(/työn nimi/i), {
    target: { value: 'Johtoselvitys' },
  });

  fireEvent.change(screen.getAllByLabelText(/katuosoite/i)[0], {
    target: { value: 'Mannerheimintie 5' },
  });
  fireEvent.change(screen.getAllByLabelText(/postinumero/i)[0], {
    target: { value: '00100' },
  });
  fireEvent.change(screen.getAllByLabelText(/postitoimipaikka/i)[0], {
    target: { value: 'Helsinki' },
  });

  fireEvent.click(screen.getByLabelText(/uuden rakenteen tai johdon rakentamisesta/i));

  fireEvent.click(screen.getByTestId('excavationYes'));

  fireEvent.change(screen.getByLabelText(/työn kuvaus/i), {
    target: { value: 'Testataan johtoselvityslomaketta' },
  });

  fireEvent.change(screen.getByLabelText(/Nimi/), {
    target: { value: 'Matti Meikäläinen' },
  });
  fireEvent.change(screen.getByLabelText(/sähköposti/i), {
    target: { value: 'matti.meikalainen@test.com' },
  });
  fireEvent.change(screen.getByLabelText(/puhelinnumero/i), {
    target: { value: '0000000000' },
  });
}

function fillAreasInformation() {
  fireEvent.change(screen.getByLabelText(/työn arvioitu alkupäivä/i), {
    target: { value: '1.4.2024' },
  });
  fireEvent.change(screen.getByLabelText(/työn arvioitu loppupäivä/i), {
    target: { value: '1.6.2024' },
  });
}

function fillContactsInformation() {
  // Fill customer info
  fireEvent.click(screen.getAllByRole('button', { name: /tyyppi/i })[0]);
  fireEvent.click(screen.getAllByText(/yritys/i)[0]);
  fireEvent.change(screen.getAllByLabelText(/Nimi/)[0], {
    target: { value: 'Yritys Oy' },
  });
  fireEvent.change(screen.getAllByLabelText(/y-tunnus/i)[0], {
    target: { value: '2182805-0' },
  });
  fireEvent.change(screen.getAllByLabelText(/sähköposti/i)[0], {
    target: { value: 'yritys@test.com' },
  });
  fireEvent.change(screen.getAllByLabelText(/puhelinnumero/i)[0], {
    target: { value: '0000000000' },
  });

  // Fill contractor info
  fireEvent.click(screen.getAllByRole('button', { name: /tyyppi/i })[1]);
  fireEvent.click(screen.getAllByText(/yritys/i)[1]);
  fireEvent.change(screen.getAllByLabelText(/Nimi/)[2], {
    target: { value: 'Yritys 2 Oy' },
  });
  fireEvent.change(screen.getAllByLabelText(/y-tunnus/i)[1], {
    target: { value: '7126070-7' },
  });
  fireEvent.change(screen.getAllByLabelText(/sähköposti/i)[2], {
    target: { value: 'yritys2@test.com' },
  });
  fireEvent.change(screen.getAllByLabelText(/puhelinnumero/i)[2], {
    target: { value: '0000000000' },
  });

  // Fill contact of contractor
  fireEvent.change(screen.getAllByLabelText(/Nimi/)[3], {
    target: { value: 'Alli Asiakas' },
  });
  fireEvent.change(screen.getAllByLabelText(/sähköposti/i)[3], {
    target: { value: 'alli.asiakas@test.com' },
  });
  fireEvent.change(screen.getAllByLabelText(/puhelinnumero/i)[3], {
    target: { value: '0000000000' },
  });
}

test('Cable report application form can be filled and saved and sent to Allu', async () => {
  const user = userEvent.setup();

  const hankeData = hankkeet[1] as HankeData;

  render(<JohtoselvitysContainer hankeData={hankeData} application={application} />);

  expect(
    screen.queryByText('Aidasmäentien vesihuollon rakentaminen (HAI22-2)')
  ).toBeInTheDocument();

  // Fill basic information page
  fillBasicInformation();

  // Move to areas page
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryByText(/hakemus tallennettu/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /sulje ilmoitus/i }));

  expect(screen.queryByText('Vaihe 2/4: Alueet')).toBeInTheDocument();

  // Fill areas page
  fillAreasInformation();

  // Move to contacts page
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryByText(/hakemus tallennettu/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /sulje ilmoitus/i }));

  expect(screen.queryByText('Vaihe 3/4: Yhteystiedot')).toBeInTheDocument();

  // Fill contacts page
  fillContactsInformation();

  // Move to summary page
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryByText(/hakemus tallennettu/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /sulje ilmoitus/i }));

  expect(screen.queryByText('Vaihe 4/4: Yhteenveto')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /lähetä hakemus/i }));
  expect(screen.queryByText(/hakemus lähetetty/i)).toBeInTheDocument();
  expect(window.location.pathname).toBe('/fi/hankesalkku/HAI22-2');
});

test('Should show error message when saving fails', async () => {
  const user = userEvent.setup();

  server.use(
    rest.post('/api/hakemukset', async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ errorMessage: 'Failed for testing purposes' }));
    })
  );

  render(<Johtoselvitys />, undefined, '/fi/johtoselvityshakemus?hanke=HAI22-2');

  await waitForLoadingToFinish();

  // Fill basic information page, so that form can be saved for the first time
  fillBasicInformation();

  // Move to next page to save form
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryAllByText(/tallentaminen epäonnistui/i)[0]).toBeInTheDocument();
});

test('Should show error message when sending fails', async () => {
  const user = userEvent.setup();

  server.use(
    rest.post('/api/hakemukset/:id/send-application', async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ errorMessage: 'Failed for testing purposes' }));
    })
  );

  const hankeData = hankkeet[1] as HankeData;

  render(<JohtoselvitysContainer hankeData={hankeData} application={application} />);

  fillBasicInformation();
  await user.click(screen.getByRole('button', { name: /seuraava/i }));
  fillAreasInformation();
  await user.click(screen.getByRole('button', { name: /seuraava/i }));
  fillContactsInformation();
  await user.click(screen.getByRole('button', { name: /seuraava/i }));
  await user.click(screen.getByRole('button', { name: /lähetä hakemus/i }));

  expect(screen.queryByText(/lähettäminen epäonnistui/i)).toBeInTheDocument();
});

test('Form can be saved without hanke existing first', async () => {
  const user = userEvent.setup();

  render(<Johtoselvitys />, undefined, '/fi/johtoselvityshakemus');

  // Fill basic information page
  fillBasicInformation();

  // Move to areas page
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryByText(/hakemus tallennettu/i)).toBeInTheDocument();
  expect(screen.queryByText('Johtoselvitys (HAI22-12)')).toBeInTheDocument();
  expect(screen.queryByText('Vaihe 2/4: Alueet')).toBeInTheDocument();
});

test('Save and quit works', async () => {
  const user = userEvent.setup();

  render(<Johtoselvitys />, undefined, '/fi/johtoselvityshakemus?hanke=HAI22-2');

  await waitForLoadingToFinish();

  // Fill basic information page
  fillBasicInformation();

  // Move to areas page
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryByText(/hakemus tallennettu/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /sulje ilmoitus/i }));
  await user.click(screen.getByRole('button', { name: /tallenna ja keskeytä/i }));

  expect(screen.queryAllByText(/hakemus tallennettu/i).length).toBe(2);
  expect(window.location.pathname).toBe('/fi/hankesalkku/HAI22-2');
});

test('Save and quit works without hanke existing first', async () => {
  const user = userEvent.setup();

  render(<Johtoselvitys />, undefined, '/fi/johtoselvityshakemus');

  // Fill basic information page
  fillBasicInformation();

  // Move to areas page
  await user.click(screen.getByRole('button', { name: /seuraava/i }));

  expect(screen.queryByText(/hakemus tallennettu/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /sulje ilmoitus/i }));
  await user.click(screen.getByRole('button', { name: /tallenna ja keskeytä/i }));

  expect(screen.queryAllByText(/hakemus tallennettu/i).length).toBe(2);
  expect(window.location.pathname).toBe('/fi/hankesalkku/HAI22-13');
});
