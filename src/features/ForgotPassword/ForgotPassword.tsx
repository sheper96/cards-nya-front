import React from 'react';
import BoxContainer from '../../common/components/BoxContainer/BoxContainer';

const ForgotPassword = () => {
    return (
        <BoxContainer title={'Forgot your password?'} subTextForm={'Did you remember your password?'} subLinkUrlText={'Try logging in'}
                      subLinkUrl={'/registration'}>
        </BoxContainer>
    );
};

export default ForgotPassword;