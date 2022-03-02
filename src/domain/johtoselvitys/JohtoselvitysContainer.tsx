import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { Button } from 'hds-react';
import { BasicHankeInfo } from './BasicInfo';

import { JohtoselvitysFormValues } from './types';
import { Contacts } from './Contacts';
import { Geometries } from './Geometries';
import { ReviewAndSend } from './ReviewAndSend';
import api from '../api/api';

interface ButtonProps {
  nextPath?: string;
  previousPath?: string;
}

const NavigationButtons: React.FC<ButtonProps> = ({ nextPath, previousPath }) => {
  const navigate = useNavigate();
  const formik = useFormikContext<JohtoselvitysFormValues>();

  const saveFormState = async () => {
    console.log('saveFormState');
    console.log(formik.values);
    const { data } = await api.post<JohtoselvitysFormValues>('/hakemukset', formik.values);
    formik.setValues(data);
  };

  const sendFormToAllu = async () => {
    const { data } = await api.post<unknown>(
      `/hakemukset/${formik.values.id}/send-application`,
      {}
    );
    console.log('Value requested to be sent to allu');
    console.log(data);
  };

  return (
    <div>
      {previousPath && (
        <Button
          onClick={() => {
            // saveFormState();
            navigate(`/fi/johtoselvityshakemus${previousPath}`); // TODO: localized links
          }}
        >
          {previousPath}
        </Button>
      )}
      {nextPath && (
        <Button
          onClick={() => {
            // saveFormState();
            navigate(`/fi/johtoselvityshakemus${nextPath}`); // TODO: localized links
          }}
        >
          {nextPath}
        </Button>
      )}
      {!nextPath && ( // Final page reached, provide an action to save
        <div>
          <Button
            onClick={() => {
              saveFormState();
              // navigate(`/fi/hakemus${nextPath}`); // TODO: localized links
            }}
          >
            Tallenna hakemus
          </Button>
          <hr />
          <Button
            onClick={() => {
              sendFormToAllu();
              // navigate(`/fi/hakemus${nextPath}`); // TODO: localized links
            }}
          >
            Lähetä hakemus
          </Button>
        </div>
      )}
    </div>
  );
};

const JohtoselvitysContainer: React.FC = () => {
  const initialValues: JohtoselvitysFormValues = {
    id: null,
    applicationType: 'CABLE_REPORT',
    applicationData: {
      name: '',
      customerWithContacts: {
        customer: {
          type: 'PERSON',
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
          ovt: null, // TODO: add to frontend
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
      geometry: {
        type: 'GeometryCollection',
        crs: {
          type: 'name',
          properties: {
            name: 'EPSG:3879',
          },
        },
        geometries: [],
      },
      startTime: 1646267516.878748,
      endTime: 1646267516.878748,
      pendingOnClient: true,
      identificationNumber: 'HAI-123', // TODO: add to UI
      clientApplicationKind: 'HAITATON', // TODO: add to UI
      workDescription: '',
      contractorWithContacts: {
        customer: {
          type: 'COMPANY',
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
          ovt: null, // TODO: add to frontend
          invoicingOperator: null,
          sapCustomerNumber: null,
        },
        contacts: [
          {
            name: '',
            postalAddress: {
              streetAddress: {
                streetName: '',
              },
              postalCode: '',
              city: '',
            },
            email: '',
            phone: '',
            orderer: false,
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
    },
  };

  const formSteps = [
    {
      path: '/',
      element: <BasicHankeInfo />,
      title: 'Perustiedot',
    },
    {
      path: '/contacts',
      element: <Contacts />,
      title: 'Yhteystiedot',
    },
    {
      path: '/alueet',
      element: <Geometries />,
      title: 'Aluetiedot',
    },
    {
      path: '/yhteenveto',
      element: <ReviewAndSend />,
      title: 'Yhteenveto',
    },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          // TODO: maybe needed for entire form validation prior to last page submit?
          // eslint-disable-next-line @typescript-eslint/no-empty-function
        }}
      >
        <Routes>
          {formSteps.map((formStep, i) => {
            return (
              <Route
                path={formStep.path}
                element={
                  <>
                    {formStep.element}
                    <br />
                    <NavigationButtons
                      nextPath={formSteps[i + 1]?.path}
                      previousPath={formSteps[i - 1]?.path}
                    />{' '}
                  </>
                }
              />
            );
          })}
        </Routes>
      </Formik>
    </>
  );
};

export default JohtoselvitysContainer;
