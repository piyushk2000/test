import React, { useEffect, useState } from 'react';
import { RequestServer } from '../../utils/services';
import { APIRoutes } from '../../constants';
import PageLayout from '../../atoms/page-layout';
import MyDashboardsPageHeader from '../../molecules/app-bars/Mydashboards-page';
import { Box, Button, MenuItem, Select } from '@mui/material';

const DashboardPage = () => {
    const [dashboardIds, setDashboardIds] = useState<{ name: string; id: string }[]>([]);
    const [selectedDashboard, setSelectedDashboard] = useState<string>('');
    const [metabaseURL, setMetabaseURL] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardIds = async () => {
            try {
                const response = await RequestServer(APIRoutes.getDashboardIds, 'get');
                const ids = Object.entries(response.data).map(([name, id]:any) => ({
                    id: id,
                    name: name
                })) || [];
                setDashboardIds(ids);
                if (ids.length > 0) {
                    setSelectedDashboard(ids[0].id);
                }
            }
            catch (error) {
                setError('Failed to fetch dashboard IDs');
            }
        };
        
        fetchDashboardIds();
    }, []);

    const getMetabaseURL = async () => {
        if (!selectedDashboard) return;
        try {
            const response = await RequestServer(APIRoutes.getMetabaseURL, 'post', {
                dashboard: selectedDashboard
            });
            setMetabaseURL(response.url);
            setError(null);
        } catch (error: any) {
            setError(error.message);
        }
    };
    useEffect(() => {
        if (selectedDashboard) {
            getMetabaseURL()
        }
    }, [selectedDashboard])

    return (
        <PageLayout>
            <MyDashboardsPageHeader
                selectedDashboard={selectedDashboard}
                setSelectedDashboard={setSelectedDashboard}
                dashboardIds={dashboardIds}
                getMetabaseURL={getMetabaseURL}
            />
                {metabaseURL && (
                    <Box sx={{ mt: 3 }}>
                        <iframe
                            src={metabaseURL}
                            title="Metabase Dashboard"
                            width="100%"
                            height="850vh"
                            style={{ border: '1px solid #ccc' }}
                        />
                    </Box>
                )}
        </PageLayout>
    );
};
export default DashboardPage;