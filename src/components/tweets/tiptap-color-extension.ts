import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const HashTag = Extension.create({
  name: 'hashTag',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('hashTag'),
        props: {
          decorations(state) {
            const { doc } = state;
            const decorations: Decoration[] = [];

            const regex = /(^|\s)(#\S*)(?=\s|$)/g;

            doc.descendants((node, pos) => {
              if (!node.isText) return;

              const text = node.text;
              let match;

              regex.lastIndex = 0;

              while ((match = regex.exec(text as string)) !== null) {
                const start = pos + match.index + (match[1] ? match[1].length : 0);
                const end = start + match[2].length;

                if (!match[2].includes('##')) {
                  const decoration = Decoration.inline(start, end, {
                    class: 'hashtag',
                  });
                  decorations.push(decoration);
                }
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
