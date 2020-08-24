import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import Keyboard from 'react-virtual-keyboard';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/schedule', {direction: 'none'});
    }
  };

    function handleUsernameChange(data : any){
        setUsername(data);
    }
    
    function handlePasswordChange(data : any){
        setPassword(data);
    }

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <div className="login-logo">
              <img src="assets/img/appicon.svg" alt="Ionic logo" />
          </div>
          
          <form noValidate onSubmit={login}>
              <IonList>
                  <IonItem>
                      <IonLabel position="stacked" color="primary">Username</IonLabel>
                      <Keyboard 
                          value={username}
                          name='username'
                          options={{
                              type:"input",
                                  layout: "qwerty",
                                  alwaysOpen: false,
                                  usePreview: false,
                                  useWheel: false,
                                  stickyShift: false,
                                  appendLocally: true,
                                  color: "light",
                                  reposition: true,
                                  updateOnChange: true,
                                  initialFocus: true,
                                  display: {
                                      "accept" : "Submit"
                                  }
                          }}
                          placeholder="Enter Username"
                          onChange={handleUsernameChange}
                          onAccepted={() => alert(`You've submitted "${username}" as a username`)}
                      />
                  </IonItem>

                  {formSubmitted && usernameError && <IonText color="danger">
                      <p className="ion-padding-start">
                          Username is required
                      </p>
              </IonText>}

              <IonItem>
                  <IonLabel position="stacked" color="primary">Password</IonLabel>
                    <Keyboard 
                          value={password}
                          name='password'
                          options={{
                              type:"password",
                                  layout: "qwerty",
                                  alwaysOpen: false,
                                  usePreview: false,
                                  useWheel: false,
                                  stickyShift: false,
                                  appendLocally: true,
                                  color: "light",
                                  reposition: true,
                                  updateOnChange: true,
                                  initialFocus: true,
                                  display: {
                                      "accept" : "Submit"
                                  }
                          }}
                          placeholder="Enter Password"
                          onChange={handlePasswordChange}
                          onAccepted={() => alert(`You've submitted "${password}" as a password`)}
                      />
              </IonItem>

              {formSubmitted && passwordError && <IonText color="danger">
                  <p className="ion-padding-start">
                      Password is required
                  </p>
          </IonText>}
      </IonList>

      <IonRow>
          <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
          </IonCol>
          <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
          </IonCol>
      </IonRow>
  </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})
