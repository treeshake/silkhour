import { isNil } from 'rambda';
import { RingBuilder } from './types';

export function getRingBuilder(): RingBuilder | null {
  const ringBuilderSession = sessionStorage.getItem('engagement.ring.builder');
  const ringBuilder: RingBuilder | null = !isNil(ringBuilderSession)
    ? JSON.parse(ringBuilderSession)
    : null;

  return ringBuilder;
}

/**
 * Store attributes in sessionStorage - not ideal, but pagination and possibly other selections on the collections page is stripping the URL queries
 */
export function updateRingBuilder(changes: Partial<RingBuilder>): RingBuilder {
  const current = getRingBuilder() ?? {};
  const payload: RingBuilder = {
    ...(current ?? {}),
    ...changes,
  };
  sessionStorage.setItem('engagement.ring.builder', JSON.stringify(payload));
  return payload;
}
