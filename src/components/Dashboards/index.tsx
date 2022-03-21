import React, { useReducer, useState } from 'react';
import { CumulioDashboardComponent } from '@cumul.io/react-cumulio-dashboard'
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
                <CumulioDashboardComponent
                    dashboardId={dashboards[activeDashboard].dashboardId}
                    loaderBackground="rgb(238, 243, 246)"
                    loaderFontColor="rgb(0, 45, 112)"
                    loaderSpinnerColor="rgb(0, 54, 136)"
                    loaderSpinnerBackground="rgb(194, 209, 233)"
                />
            </div>
        </div>
    );
};

export default Dashboards;
