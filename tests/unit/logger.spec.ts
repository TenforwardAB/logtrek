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
 * Created on 1/24/25 :: 9:39AM BY joyider <andre(-at-)sess.se>
 *
 * This file :: logger.spec.ts is part of the modulogger project.
 */

import { Logger } from '../../src/logger';
import { LoggerPlugin } from '../../src/types';

jest.mock('../../src/pluginLoader', () => ({
    loadPlugins: jest.fn(() => [
        {
            pluginType: 'console',
            write: jest.fn(),
            configure: jest.fn(),
        },
        {
            pluginType: 'file',
            write: jest.fn(),
            configure: jest.fn(),
        },
    ]),
}));

describe('Logger', () => {
    const loadPlugins = require('../../src/pluginLoader').loadPlugins;

    beforeEach(() => {
        loadPlugins.mockClear();
    });

    it('should call the correct plugin write method', () => {
        const logger = new Logger('info', 'file');
        logger.info('Testing fileLogger');

        const filePlugin = loadPlugins.mock.results[0].value.find(
            (plugin: LoggerPlugin) => plugin.pluginType === 'file'
        );

        
        expect(filePlugin).toBeDefined();
        expect(filePlugin.write).toHaveBeenCalledWith('info', 'Testing fileLogger', undefined);
    });
});
