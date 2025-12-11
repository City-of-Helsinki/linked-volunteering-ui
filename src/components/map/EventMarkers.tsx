import L, { LatLngExpression } from 'leaflet';
import React, { useMemo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { useIntl } from 'react-intl';
import { Event } from '../../store/types';

const createEventIcon = (isPast: boolean) => {
  const color = isPast ? '#999999' : '#00d7a7';

  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 8.437 12.5 28.5 12.5 28.5S25 20.937 25 12.5C25 5.596 19.404 0 12.5 0z"/>
      <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
    </svg>
  `;

  return new L.DivIcon({
    html: svgIcon,
    className: 'event-marker',
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    popupAnchor: [0, -41],
  });
};

interface EventMarkersProps {
  events: Event[];
}

interface GroupedEvent extends Event {
  offsetIndex: number;
  totalAtLocation: number;
}

const EventMarkers: React.FC<EventMarkersProps> = ({ events }) => {
  const intl = useIntl();

  const groupedEvents = useMemo(() => {
    const locationMap = new Map<string, GroupedEvent[]>();

    if (!events) {
      return [];
    }

    events.forEach((event) => {
      if (!event.location?.coordinates) return;

      const [lng, lat] = event.location.coordinates;
      const key = `${lat.toFixed(5)},${lng.toFixed(5)}`;

      if (!locationMap.has(key)) {
        locationMap.set(key, []);
      }

      const group = locationMap.get(key)!;
      group.push({
        ...event,
        offsetIndex: group.length,
        totalAtLocation: 0,
      });
    });

    locationMap.forEach((group) => {
      group.forEach((event) => {
        event.totalAtLocation = group.length;
      });
    });

    return Array.from(locationMap.values()).flat();
  }, [events]);

  const formatDate = (dateString: string) =>
    intl.formatDate(new Date(dateString), {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

  const isPastEvent = (endTime: string) => {
    return new Date(endTime) < new Date();
  };

  const calculateOffset = (
    offsetIndex: number,
    totalAtLocation: number
  ): [number, number] => {
    if (totalAtLocation === 1) return [0, 0];

    const radius = 0.0002;
    const angle = (2 * Math.PI * offsetIndex) / totalAtLocation;

    return [radius * Math.cos(angle), radius * Math.sin(angle)];
  };

  return (
    <>
      {groupedEvents.map((event) => {
        if (!event.location?.coordinates) return null;

        const [lng, lat] = event.location.coordinates;
        const [latOffset, lngOffset] = calculateOffset(
          event.offsetIndex,
          event.totalAtLocation
        );

        const position: LatLngExpression = [lat + latOffset, lng + lngOffset];
        const isPast = isPastEvent(event.end_time);
        const icon = createEventIcon(isPast);

        return (
          <Marker key={event.id} position={position} icon={icon}>
            <Tooltip direction="top" offset={[0, -40]} opacity={0.9}>
              <div>
                <strong>{event.name}</strong>
                <br />
                {formatDate(event.start_time)}
                {event.maintenance_location && (
                  <>
                    <br />
                    {event.maintenance_location}
                  </>
                )}
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};

export default EventMarkers;
