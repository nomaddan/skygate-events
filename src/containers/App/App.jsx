import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollMemory from 'react-router-scroll-memory';
// react-router-scroll-memory remembers scroll position in browser history
// and scrolls to top when route changes

// Styles for App
import './App.css';

// Styles for route transitions
import './transitions.css';

// Routes
import indexRoutes from '../../routes';

// Views & Components
import PageNotFound from '../../views/PageNotFound';
import MainMenu from '../MainMenu/index';
import SiteFooter from '../../components/SiteFooter';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        'Music',
        'Sports',
        'Science & Tech',
        'Software Development',
        'Party',
      ],
      events: [],
    };
  }

  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <div>
              <ScrollMemory />
              <Layout>
                <MainMenu location={location} />
                <Content className="app__content">
                  <TransitionGroup>
                    <CSSTransition
                      timeout={200}
                      classNames="slide"
                      transitionAppearTimeout={200}
                      transitionEnterTimeout={200}
                      transitionExitTimeout={50}
                      unmountOnExit
                      key={location.key}
                    >
                      <Switch>
                        {indexRoutes.map(prop => (
                          <Route
                            exact
                            path={prop.path}
                            component={prop.component}
                            key={prop.name}
                          />
                        ))}
                        <Route
                          render={() => <PageNotFound location={location} />}
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </Content>
                <SiteFooter />
              </Layout>
            </div>
          )}
        />
      </Router>
    );
  }
}

export default App;
