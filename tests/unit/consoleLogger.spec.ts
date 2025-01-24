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
 * Created on 1/24/25 :: 9:43AM BY joyider <andre(-at-)sess.se>
 *
 * This file :: consoleLogger.spec.ts is part of the modulogger project.
 */

import consoleLogger from '../../src/plugins/consoleLogger';
import { LogLevel } from '../../src/types';

describe('consoleLogger', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    afterEach(() => {
        consoleSpy.mockClear();
    });

    it('should log messages to the console', () => {
        const message = 'Test log message';
        const meta = { key: 'value' };

        consoleLogger.write('info' as LogLevel, message, meta);
        expect(consoleSpy).toHaveBeenCalledWith('[INFO]: Test log message', meta);
    });
});
