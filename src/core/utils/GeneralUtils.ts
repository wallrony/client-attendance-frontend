import React from 'react';

export function refValue(ref: React.RefObject<HTMLInputElement | HTMLSelectElement | undefined>) {
  if (ref?.current) {
    return ref.current.value.trim();
  }

  return '';
}

export function targetValue(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  if (event.target) {
    return event.target.value.trim();
  }

  return 'null';
}

export function getFirstName(name: string) {
  return name.split(' ')[0];
}