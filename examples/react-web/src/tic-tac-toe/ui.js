/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Init, ApplyActions } from 'bgio-ui';
import { Client } from 'boardgame.io/client';
import { schema } from './ui-schema';
import { Debug } from 'boardgame.io/debug';
import TicTacToe from './game';

const client = Client({
  game: TicTacToe,
  debug: { impl: Debug },
});

class UI extends React.Component {
  // TODO:
  // Everything inside this function can go into the
  // implementation of a new UIClient class.
  componentDidMount() {
    client.start();

    const state = client.getState().plugins.sandbox.data.state;
    const svg = Init(schema, state, client);

    client.subscribe(({ plugins }) => {
      ApplyActions(svg, plugins.sandbox.data.actions);
    });
  }

  render() {
    return <div id="container"></div>;
  }
}

export default UI;