import React, { useRef, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { allowedSubdomains } from './GoogleAnalyticsTracker';

export const useExpertFilterEvents = (filterPayload: any) => {
  const appliedFiltersRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    const currentHostname = window.location.hostname;
    if (!allowedSubdomains.includes(currentHostname)) {
      return
    }

    const newFilters: { [key: string]: any } = {};

    const addFilter = (key: string, value: any) => {
      // only adding filters that have a value and are different from the previous value, or are new
      if (value && appliedFiltersRef.current[key] !== value) {
        newFilters[key] = value;
      }
    };

    if (filterPayload.advanceFilter && Object.keys(filterPayload.advanceFilter).length > 0) {
      Object.entries(filterPayload.advanceFilter).forEach(([key, value]) => {
        addFilter(`Advanced: ${key}`, value);
      });
    }

    if (filterPayload.otherSearchFilter) {
      Object.entries(filterPayload.otherSearchFilter).forEach(([key, value]) => {
        if (value) {

          addFilter(`Quick Search: ${key}`, value);
        }
      });
    }

    addFilter('Badge Filter', filterPayload.badgeFilter?.length > 0 ? filterPayload.badgeFilter.join(', ') : undefined);
    addFilter('Date Filter', filterPayload.dateFilter);
    addFilter('Pending Approvals', filterPayload.pending_approvals ? 'true' : undefined);
    addFilter('Search Filter', filterPayload.searchFilter);

    //Sort was going on page load , so we are not sending sort 
    
    // if (filterPayload.sortFilter) {
    //   const [order, field] = filterPayload.sortFilter.split('___');
    //   addFilter('Sort', `${field} ${order}`);
    // }

    addFilter('Dropdown: Status', filterPayload.statusFilter?.length > 0 ? filterPayload.statusFilter.join(', ') : undefined);
    addFilter('Timeline Filter', filterPayload.timelineFilters?.filterAdded ? 'true' : undefined);
    addFilter('Type', filterPayload.typeFilter);

    // Send events for new or changed filters
    Object.entries(newFilters).forEach(([key, value]) => {
      ReactGA.event({
        category: 'Expert Search',
        action: 'Expert Search',
        label: key,
      });
    });

    // Update appliedFiltersRef with new values
    const finalObj = { ...appliedFiltersRef.current, ...newFilters };

    const expert_search_combo = Object.keys(finalObj)
      .map(key => key.split(/: |___/).pop()
        ?.replace(/^domain_|Filter$/g, '')
        .trim()
      )
      .filter(Boolean)
      .join(',')
      .slice(0, 254);
    ReactGA.event({
      category: 'Expert Search Combo',
      action: 'Expert Search Combo',
      label: expert_search_combo,
    });

    appliedFiltersRef.current = finalObj;


  }, [filterPayload]);

  return Object.keys(appliedFiltersRef.current);
};