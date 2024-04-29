import { exec } from 'node:child_process';
import { differenceInYears } from 'date-fns';

export function isNullOrUndefined<T>(
  obj: T | null | undefined,
): obj is null | undefined {
  return typeof obj === 'undefined' || obj === null;
}

/**
 * Converts an enum into a String
 * @param _enum Enum
 * @returns string type
 * @gist https://gist.github.com/ruslanguns/d5a6bd9af6bddb77d6b2f2a2fef82748
 */
export const EnumToString = (_enum: object) => {
  return Object.keys(_enum)
    .map((key) => _enum[key])
    .filter((value) => typeof value === 'string')
    .join(', ');
};

/**
 * Converts an enum into a String
 * @param expiresAt Date
 * @returns string return date as string
 */
export function getDateToString(expiresAt: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h12',
  };
  return expiresAt.toLocaleDateString('es-PE', options);
}

export function getElderlyAge(age: Date) {
  const result = differenceInYears(new Date(), new Date(age));
  return Math.floor(result) < 18;
}

export function numberFormat(amount: number) {
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(amount);
}

export function getRandomCode(length?: number): string {
  const defaultLength = 8;
  const lengthValue = length + 2;
  return Math.random()
    .toString()
    .substring(2, lengthValue ?? defaultLength);
}

/**
 * encodeBase64.
 *
 * @param {string} data -
 * @returns {string} encrypt text
 */
export function encodeBase64(data: string): string {
  return Buffer.from(data).toString('base64');
}

/**
 * decodeBase64.
 *
 * @param {string} data -
 * @param {BufferEncoding} decode -
 * @returns {string} decode string
 */
export function decodeBase64(data: string, decode?: BufferEncoding): string {
  return Buffer.from(data, 'base64').toString(decode ?? 'ascii');
}

export function removeAccents(str: string) {
  if (!str) return null;
  return str?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
}

export async function runCommand(command: string) {
  console.log('cmd', command);

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      resolve(stdout);
    });
  });
}
