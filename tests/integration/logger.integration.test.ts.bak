/**
 * This file is licensed under the European Union Public License (EUPL) v1.2.
 * You may only use this work in compliance with the License.
 * You may obtain a copy of the License at:
 *
 * https:
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed "as is",
 * without any warranty or conditions of any kind.
 *
 * Copyright (c) 2024- Tenforward AB. All rights reserved.
 *
 * Created on 1/24/25 :: 9:45AM BY joyider <andre(-at-)sess.se>
 *
 * This file :: logger.integration.test.ts is part of the modulogger project.
 */

import { Logger } from '../../src/logger';
import * as fs from 'fs';
import * as path from 'path';


jest.mock('../../src/pluginLoader', () => ({
    loadPlugins: jest.fn(() => [
        {
            pluginType: 'console',
            write: jest.fn((level: string, message: string) => {
                console.log(`[${level.toUpperCase()}]: ${message}`);
            }),
            configure: jest.fn(),
        },
        {
            pluginType: 'file',
            write: jest.fn((level: string, message: string) => {
                const logFilePath = path.resolve(process.cwd(), 'tests/logs', 'app.log');
                fs.appendFileSync(logFilePath, `[${level.toUpperCase()}]: ${message} {}\n`);
            }),
            configure: jest.fn((options: Record<string, any>) => {
                console.log('File plugin configured with options:', options);
            }),
        },
    ]),
}));


jest.mock('fs', () => ({
    ...jest.requireActual('fs'),
    appendFileSync: jest.fn(),
}));


const mockWriteFileSync = jest.requireMock('fs').appendFileSync as jest.Mock;

describe('Logger Integration', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const logFilePath = path.resolve(process.cwd(), 'tests/logs', 'app.log');

    afterEach(() => {
        consoleSpy.mockClear();
        mockWriteFileSync.mockClear();
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    it('should log messages using the console plugin', () => {
        const logger = new Logger('info', 'console');
        logger.info('Integration test console log');

        expect(consoleSpy).toHaveBeenCalledWith('[INFO]: Integration test console log');
    });

    it('should log messages using the file plugin', () => {
        const logger = new Logger('info', 'file');
        logger.info('Integration test file log');

        expect(mockWriteFileSync).toHaveBeenCalledWith(
            logFilePath,
            '[INFO]: Integration test file log {}\n'
        );
    });

    it('should respect log levels', () => {
        const logger = new Logger('warn', 'console');
        logger.info('This should not be logged');
        logger.warn('This should be logged');

        const warnCalls = consoleSpy.mock.calls.filter(
            (call) => call[0]?.includes('[WARN]')
        );

        expect(warnCalls.length).toBe(1);
        expect(consoleSpy).toHaveBeenCalledWith('[WARN]: This should be logged');
    });
});
