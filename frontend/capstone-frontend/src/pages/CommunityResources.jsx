import React, { useState } from 'react';

const CommunityResources = () => {
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resources, setResources] = useState([]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSearch = async () => {
        if (!location) {
            setError('Please enter a location.');
            return;
        }

        setLoading(true);
        setError('');

        // Mock fetching localized content based on the user's location
        try {
            // Mock fetching outdoor activities and events near the user's location
            const mockOutdoorActivities = ['Hiking', 'Camping', 'Fishing'];
            const mockEvents = ['Music Festival', 'Art Exhibition', 'Food Fair'];

            // Combine the fetched resources
            const allResources = [...mockOutdoorActivities, ...mockEvents];
            setResources(allResources);
        } catch (error) {
            setError('Failed to fetch resources. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <div className="community-resources">
            <h2>Community Resources</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter location (zip code or city)"
                    value={location}
                    onChange={handleLocationChange}
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {resources.length > 0 && (
                <div className="resources-list">
                    <h3>Resources Near {location}:</h3>
                    <ul>
                        {resources.map((resource, index) => (
                            <li key={index}>{resource}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CommunityResources;
