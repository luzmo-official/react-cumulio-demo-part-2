# Using react-cumulio to show a [Cumul.io](https://cumul.io/main) dashboard - Part 2

### [Code Part 2](https://github.com/cumulio/react-cumulio-demo-part-2)

# Contents

- [What we will build](#What-we-will-build)
- [Part 2 - Embedding dashboards in a multipage application](#Part-2---Embedding-dashboards-in-a-multipage-application)
- [Code](#Code)
- [Quick Links](#Quick-Links)

---

# What we will build

This is part 2 of the tutorial of react-cumulio. Go to [part 1](https://github.com/cumulio/react-cumulio-demo-part-1) if you haven't read it yet.  
For this part we will make a multipage website with a few dashboards.

---

# Part 2 - Embedding dashboards in a multipage application

We will pick up where we left at part 1.
Let's first start with adding our pages. We'll have two: home and dashboard.

For this we will use the react-router-dom package. 

```bash
yarn add react-router-dom
```

OR

```bash
npm i react-router-dom
```

If you would like to have typescript typings, add the `@types/react-router-dom` types package to your dev dependencies.
Now add a components directory inside the src directory. Here we will create a Dashboards and Home directory both having a `index.tsx` file with our component and a `styles.scss` file with out custom styling.

Then, make a navbar menu in **`App.tsx`** so that we can access our components:

```typescript
import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import './App.css';
import Dashboards from './components/Dashboards';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-title">
          <h1>My Website</h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/dashboards" className="navbar-item">Dashboards</Link>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/dashboards" exact component={Dashboards} />
        <Route path="/" exact component={Home} />
      </Switch>

      <footer className="footer"><span></span></footer>

    </Router>
  );
}

export default App;
```

And add some css in **`App.css`**:

```CSS
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  color: white;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  height: 100%;
}

/* Header */
.navbar,
.navbar-end,
.navbar-menu,
.navbar-start {
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.navbar {
  background-color: #3a3a3a;
  -webkit-box-align: stretch;
  display: flex;
}

.navbar-menu {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding-left: 1rem;
}

.navbar-item {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  padding-right: 1rem;
}

.navbar-item:hover,
.navbar-item:active {
  background-color: #2c2c2c;
}

.navbar a,
.navbar-title h1 {
  text-decoration: none;
  padding-left: 1rem;
  color: rgb(233, 233, 233);
}

.navbar a {
  font-size: large;
}

/* Footer */
.footer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3a3a3a;
  color: white;
  font-weight: 600;
}
```

Now the routing to our components will work. The _home_ component will display a simple home page. The _dashboard_ component will eventually show a few tabs with a dashboard on each tab.
We will first add some simple HTML and CSS for our home page.

**`Home\index.tsx`**

```typescript
import React from 'react';
import './styles.scss';

const Home = () => {
    return (
        <div className="container">
            <div className="title">
                <h1>Home Page</h1>
            </div>
            <div className="content">
                <p>Go to the dashboards tab to view your dashboards!</p>
            </div>
        </div>
    );
};

export default Home;
```

**`Home\styles.scss`**

```CSS
.container {
    height: 100%;    
    background-color: #209cee;
    padding: 1rem;
}

.title h1 {
    background-color: #209cee;
}

.container p {
    font-size: large;
}
```

Now for our dashboard component. Here we can add our dashboards and tabs.   

**`Dashboards\index.tsx`**

```typescript
import React, { useReducer, useState } from 'react';
import { CumulioComponent, CumulioContext, initialState, reducer } from "react-cumulio";
import './styles.scss';

const Dashboards = () => {
    const [activeDashboard, setActiveDashboard] = useState(0);

    const dashboards = [
        {
            name: 'Facebook',
            dashboardId: '763177aa-9b93-4ae7-903e-3cb07dc593d8'
        },
        {
            name: 'LinkedIn',
            dashboardId: '722fa789-89c8-4149-be4d-bc3eb348a65f'
        },
        {
            name: 'Adwords',
            dashboardId: 'eb8a3bec-2d19-4229-b40a-2f31ad379780'
        }
    ];
};

export default Dashboards;
```

You can use your own dashboards if you want.
Now we want to go to different dashboards depending on which tab we are on.
We use the useState hook from react to keep track of the active dashboard.

```typescript
const Dashboards = () => {
    const [activeDashboard, setActiveDashboard] = useState(0);
};
```

Now we will edit the **`Dashboards\index.tsx`** so that we can actually see the tabs and dashboards.
Add the tabs to the toolbar. This will show all tabs, this way when you click on a tab, it will show you the dashboard from the same index as your tabs.

```typescript
import React, { useReducer, useState } from 'react';
import { CumulioComponent, CumulioContext, initialState, reducer } from "react-cumulio";
import './styles.scss';

const Dashboards = () => {
    const [activeDashboard, setActiveDashboard] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);

    const dashboards = [
        {
            name: 'Facebook',
            dashboardId: '763177aa-9b93-4ae7-903e-3cb07dc593d8'
        },
        {
            name: 'LinkedIn',
            dashboardId: '722fa789-89c8-4149-be4d-bc3eb348a65f'
        },
        {
            name: 'Adwords',
            dashboardId: 'eb8a3bec-2d19-4229-b40a-2f31ad379780'
        }
    ];

    return (
        <div className="main">
            <div className="toolbar" role="banner">
                <ul className="tabs">
                    {dashboards.map((dashboard, index) => (
                        <li key={index} className={index === activeDashboard ? "active" : ""} onClick={(e) => setActiveDashboard(index)}>
                            {dashboard.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content" role="main">
                <CumulioContext.Provider value={{ state, dispatch }}>
                    <CumulioComponent
                        dashboardId={dashboards[activeDashboard].dashboardId}
                        loaderBackground="rgb(238, 243, 246)"
                        loaderFontColor="rgb(0, 45, 112)"
                        loaderSpinnerColor="rgb(0, 54, 136)"
                        loaderSpinnerBackground="rgb(194, 209, 233)"
                    />
                </CumulioContext.Provider>
            </div>
        </div>
    );
};

export default Dashboards;
```

Now you only need 1 CumulioComponent element, the same parameters will be used with all the dashboards.
Also add some changes to the **`Dashboards\styles.scss`** file, you can always use your own styling.

```CSS
.main {
    /* Toolbar */
    .toolbar {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        background-color: rgb(7, 89, 139);
        color: white;
        font-weight: 600;
        position: relative;
        box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
        z-index: 1;
        overflow: hidden;
    }

    /* Tabs */
    .tabs {
        list-style: none;
        bottom: 0;
        min-width: 40rem;
        margin-bottom: 0;
        position: absolute;
        padding-left: 0;
        padding-bottom: 0.4rem;
    }

    .tabs li {
        float: left;
        width: 8rem;
        text-align: center;
        line-height: 3rem;
        margin-right: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        color: rgb(233, 233, 233);
        overflow: hidden;
        white-space: nowrap;
    }

    .tabs li:hover {
        color: #d4d4d4;
    }

    .tabs li:nth-of-type(1).active {
        color: rgb(255, 255, 255);
    }

    .tabs li:nth-of-type(2).active {
        color: rgb(255, 255, 255);
    }

    .tabs li:nth-of-type(3).active {
        color: rgb(255, 255, 255);
    }

    /* Content */
    .content {
        display: flex;
        margin: 32px auto;
        padding: 0 16px 16px;
        flex-direction: column;
        align-items: center;
    }
}
```

**That's it! With part 2 concluded, you now have a multipage application with some embedded dashboards.**

---

# Code
[Github Code](https://github.com/cumulio/react-cumulio-demo-part-2)  

---

# Quick Links

[Cumul.io](https://cumul.io/main) |
[Code Part 1](https://github.com/cumulio/react-cumulio-demo-part-1) | 
[Code Part 2](https://github.com/cumulio/react-cumulio-demo-part-2) |
[npm react-cumulio](https://www.npmjs.com/package/react-cumulio) |
