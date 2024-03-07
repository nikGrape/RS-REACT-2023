import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';
import '@testing-library/jest-dom/extend-expect';

expect.extend(matchers);

vi.stubGlobal('__isBrowser__', false);
