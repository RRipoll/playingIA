/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { FunctionCall } from '../state';
// FIX: Import `Type` to use enum values for parameter types.
import { FunctionResponseScheduling, Type } from '@google/genai';

export const navigationSystemTools: FunctionCall[] = [
  {
    name: 'find_route',
    description: 'Finds a route to a specified destination.',
    parameters: {
      // FIX: Use `Type.OBJECT` instead of "OBJECT".
      type: Type.OBJECT,
      properties: {
        destination: {
          // FIX: Use `Type.STRING` instead of "STRING".
          type: Type.STRING,
          description: 'The destination address or landmark.',
        },
        modeOfTransport: {
          // FIX: Use `Type.STRING` instead of "STRING".
          type: Type.STRING,
          description: 'The mode of transport (e.g., driving, walking, cycling).',
        },
      },
      required: ['destination'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'find_nearby_places',
    description: 'Finds nearby places of a certain type.',
    parameters: {
      // FIX: Use `Type.OBJECT` instead of "OBJECT".
      type: Type.OBJECT,
      properties: {
        placeType: {
          // FIX: Use `Type.STRING` instead of "STRING".
          type: Type.STRING,
          description: 'The type of place to search for (e.g., restaurant, gas station, park).',
        },
        radius: {
          // FIX: Use `Type.NUMBER` instead of "NUMBER".
          type: Type.NUMBER,
          description: 'The search radius in kilometers.',
        },
      },
      required: ['placeType'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'get_traffic_info',
    description: 'Gets real-time traffic information for a specified location.',
    parameters: {
      // FIX: Use `Type.OBJECT` instead of "OBJECT".
      type: Type.OBJECT,
      properties: {
        location: {
          // FIX: Use `Type.STRING` instead of "STRING".
          type: Type.STRING,
          description: 'The location to get traffic information for.',
        },
      },
      required: ['location'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
];
