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
 * Created on 1/24/25 :: 9:44AM BY joyider <andre(-at-)sess.se>
 *
 * This file :: fileLogger.spec.ts is part of the modulogger project.
 */

import fileLogger from '../../src/plugins/fileLogger';
import { LogLevel } from '../../src/types';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

describe('fileLogger', () => {
    const mockWriteFileSync = jest.spyOn(fs, 'appendFileSync').mockImplementation();
    const logFilePath = path.resolve(logDir, 'app.log');

    afterEach(() => {
        mockWriteFileSync.mockClear();
    });

    it('should write log messages to a file', () => {
        const message = 'File log message';
        const meta = { key: 'value' };

        fileLogger.write('warn' as LogLevel, message, meta);

        
        const logEntry = mockWriteFileSync.mock.calls[0][1];
        expect(logEntry).toMatch(/^\[WARN\]::\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z: File log message {"key":"value"}\n$/);
    });

    it('should allow setting a custom file path', () => {
        const customPath = path.resolve(logDir, 'custom.log');

        if (fileLogger.configure) {
            fileLogger.configure({ location: customPath });
        }

        const message = 'Custom log message';
        fileLogger.write('error' as LogLevel, message);

        
        const logEntry = mockWriteFileSync.mock.calls[0][1];
        expect(logEntry).toMatch(/^\[ERROR\]::\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z: Custom log message\n$/);
    });

    it('should exclude log type and timestamp when configured', () => {
        if (fileLogger.configure) {
            fileLogger.configure({ output_type: false, output_timestamp: false });
        }

        const message = 'Minimal log message';
        fileLogger.write('info' as LogLevel, message);

        const logEntry = mockWriteFileSync.mock.calls[0][1];
        expect(logEntry).toBe('Minimal log message\n');
    });
});
