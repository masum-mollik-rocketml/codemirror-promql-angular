import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PromQLExtension} from '@prometheus-io/codemirror-promql';
import {basicSetup} from 'codemirror';
import {EditorState} from '@codemirror/state';
import {EditorView} from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-promql-editor',
  templateUrl: './promql-editor.component.html',
  styleUrls: ['./promql-editor.component.scss']
})
export class PromqlEditorComponent implements OnInit, AfterViewInit {
/*  private static promQLHighlightMaterialTheme = HighlightStyle.define(
    [
      {
        tag: Tag.deleted,
        textDecoration: 'line-through',
      },
      {
        tag: tags.inserted,
        textDecoration: 'underline',
      },
      {
        tag: tags.link,
        textDecoration: 'underline',
      },
      {
        tag: tags.strong,
        fontWeight: 'bold',
      },
      {
        tag: tags.emphasis,
        fontStyle: 'italic',
      },
      {
        tag: tags.invalid,
        color: '#f00',
      },
      {
        tag: tags.keyword,
        color: '#C792EA',
      },
      {
        tag: tags.operator,
        color: '#89DDFF',
      },
      {
        tag: tags.atom,
        color: '#F78C6C',
      },
      {
        tag: tags.number,
        color: '#FF5370',
      },
      {
        tag: tags.string,
        color: '#99b867',
      },
      {
        tag: [tags.escape, tags.regexp],
        color: '#e40',
      },
      {
        tag: tags.definition(tags.variableName),
        color: '#f07178',
      },
      {
        tag: tags.labelName,
        color: '#f07178',
      },
      {
        tag: tags.typeName,
        color: '#085',
      },
      {
        tag: tags.function(tags.variableName),
        color: '#C792EA',
      },
      {
        tag: tags.definition(tags.propertyName),
        color: '#00c',
      },
      {
        tag: tags.comment,
        color: '#546e7a',
      }
    ]
  );*/

  @Input()
  expr = '';
  @Input()
  id = 'a';

  // private dynamicConfig = new Compartment();
  private codemirrorView: EditorView | null = null;
  private isDarkTheme = false;

  constructor(/*private themeService: ThemeService,*/
              private http: HttpClient) {
  }

  /*private static customizeCodemirrorTheme(isDarkTheme: boolean): Extension {
    return EditorView.theme({
      $completionDetail: {
        marginLeft: '0.5em',
        float: 'right',
        color: '#9d4040',
      },
      $completionMatchedText: {
        color: '#83080a',
        textDecoration: 'none',
        fontWeight: 'bold',
      },
    }, {dark: isDarkTheme});
  }*/

  ngOnInit(): void {

        /*this.isDarkTheme = true;
        if (this.codemirrorView !== null) {
          this.codemirrorView.dispatch(
            this.codemirrorView.state.update({
              effects: this.dynamicConfig.reconfigure(PromqlEditorComponent.customizeCodemirrorTheme(true))
            })
          );
        }*/

  }

  ngAfterViewInit(): void {
    this.initializeCodemirror();
  }

  private initializeCodemirror(): void {
    const promQL = new PromQLExtension().setComplete({remote: {url: 'https://kube-prometheus.prodcluster.babyrocket.net'}});
    this.codemirrorView = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, promQL.asExtension(), EditorView.editable.of(true)],
      }),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // tslint:disable-next-line:no-non-null-assertion
      parent: document.getElementById('editor')!,
    });

    /*new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          promQLExtension.asExtension(),
          // PromqlEditorComponent.promQLHighlightMaterialTheme,
          this.dynamicConfig.of(PromqlEditorComponent.customizeCodemirrorTheme(this.isDarkTheme)), EditorView.editable.of(true),
          EditorView.lineWrapping
        ],
        doc: this.expr,
      }),
      parent: doc
    });*/
  }

  click($event: MouseEvent) {
    this.http.get('https://promlens.prodcluster.babyrocket.net/api/parse', {params: {
      'expr': this.codemirrorView.state.doc.toString()
    }})
      .subscribe(value => {
        console.log(value)
      })
  }
}
