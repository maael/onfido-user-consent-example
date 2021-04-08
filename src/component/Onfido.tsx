import {useCallback, useEffect, useState} from 'react';
import * as Onfido from 'onfido-sdk-ui';

function OnfidoComponent () {
  const [onfidoInstance, setOnfidoInstance] = useState<Onfido.SdkHandle | null>(null);

  const initOnfido = useCallback(async () => {
    try {
      const instance = Onfido.init({
        isModalOpen: true,
        token: 'TOKEN HERE',
        onComplete: async (data) => {
          console.info('onComplete', data)
        },
        onUserExit: async (userExitCode) => {
          console.warn('onUserExit', userExitCode)
        },
        onError: async (error) => {
          console.error('onError', error)
        },
        steps: [
          {
            type: 'welcome',
            options: {
              title: 'Verify',
              descriptions: [
                '👋 Hi there, please follow these short steps to verify your identity.',
              ],
              nextButton: 'Verify',
            },
          },
          'userConsent',
          {
            type: 'document',
            options: {
              showCountrySelection: true,
              documentTypes: {
                passport: true,
                driving_licence: true,
                national_identity_card: true,
                residence_permit: true,
              },
            },
          },
          'face',
          {
            type: 'complete',
            options: {
              message: 'Thanks, that all looks good!',
              submessage: 'Just a few more steps.',
            },
          },
        ],
      });

      setOnfidoInstance(instance);
    } catch (err) {
      console.error('err:', err.message, err.request);
    }
  }, []);

  useEffect(() => {
    if (!onfidoInstance) {
      console.info('create instance');
      initOnfido().catch((e) => console.error(e));
    }
    return () => {
      console.info('teardown');
      onfidoInstance && onfidoInstance.tearDown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="onfido-mount" />
  );
}

export default OnfidoComponent;
