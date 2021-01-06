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

export function formatDuration(time: number) {
  let text = '';

  const seconds = time - Math.floor(time / 60) * 60;
  let minutes = time >= 60 ? time / 60 : 0;
  let hours = minutes >= 60 ? minutes / 60 : 0;

  if(minutes > 60) {
    hours += Math.floor(minutes / 60) * 1;
    minutes -= Math.floor(minutes / 60) * 1;
  }

  if(hours) {
    text += `${hours} hora(s)`;

    if(minutes && seconds) {
      text += ', ';
    } else if((minutes && !seconds) || (!minutes && seconds)) {
      text += ' e ';
    }
  }

  if(minutes) {
    text += `${minutes} minutos`;

    if(seconds) {
      text += ' e ';
    }
  }

  if(seconds) {
    text += `${seconds} segundos`;
  }

  text += '.';

  return text;
}
