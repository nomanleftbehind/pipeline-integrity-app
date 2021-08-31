import React from 'react';
import RenderPipeline from './components/renderPipeline';
import Header from './components/Header';

import './app.css';

class PipelineDatabase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pipelines: [],
      injectionPointOptions: [],
      expandedPipelines: [],
      filterText: { "license": "", segment: "", substance: "", from: "", to: "", "injection points": "", status: "" }
    };
    this.fetchPipelines = this.fetchPipelines.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  fetchPipelines() {
    fetch("http://localhost:5002/pipelines")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pipelines: result
          });
          // console.log(this.state.pipelines);
        },
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
          console.error('Error:', error);
        }
      );
  }

  componentDidMount() {
    this.fetchPipelines();

    fetch("http://localhost:5002/injectionpoints")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            injectionPointOptions: result
          });
          // console.log(this.state.injectionPointOptions);
        },
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
          console.error('Error:', error);
        }
      );
  }

  handleFilterTextChange(e) {
    const { name, value } = e.target;
    const newFilterText = { ...this.state.filterText };
    newFilterText[name] = value;
    this.setState({ filterText: newFilterText });
  }

  handlePipelineClick(_id) {
    const currentExpandedPipelines = this.state.expandedPipelines;
    const isPipelineCurrentlyExpanded = currentExpandedPipelines.includes(_id);
    const newExpandedPipelines = isPipelineCurrentlyExpanded ? currentExpandedPipelines.filter(ppl_id => ppl_id !== _id) : currentExpandedPipelines.concat(_id);
    this.setState({ expandedPipelines: newExpandedPipelines });
  }

  render() {
    const filterText = this.state.filterText;
    const caseInsensitiveFilterText = {};
    for (const [i, j] of Object.entries(filterText)) {
      caseInsensitiveFilterText[i] = j.toUpperCase();
    }
    // const a = [...this.state.pipelines];
    // console.log(a);

    const pipelines = this.state.pipelines.filter(pipeline => {
      const caseInsensitivePipeline = {};
      for (const [i, j] of Object.entries(pipeline)) {
        if (typeof j === "string" && i !== "_id") {
          caseInsensitivePipeline[i] = j.toUpperCase();
        }
        else {
          caseInsensitivePipeline[i] = j;
        }
      }

      const inj_pt_source = pipeline["injection points"].map(inj_pt_id => this.state.injectionPointOptions.find(inj_pt => inj_pt._id === inj_pt_id));
      return (
        caseInsensitivePipeline.license.includes(caseInsensitiveFilterText.license) &&
        caseInsensitivePipeline.segment.includes(caseInsensitiveFilterText.segment) &&
        caseInsensitivePipeline.substance.includes(caseInsensitiveFilterText.substance) &&
        caseInsensitivePipeline.from.includes(caseInsensitiveFilterText.from) &&
        caseInsensitivePipeline.to.includes(caseInsensitiveFilterText.to) &&
        (inj_pt_source === undefined ||
          (inj_pt_source.length === 0 && caseInsensitiveFilterText["injection points"].length === 0) ||
          inj_pt_source.some(i => {
            switch (i) {
              case undefined:
                return caseInsensitiveFilterText["injection points"].length === 0;
              default:
                return i.source.includes(caseInsensitiveFilterText["injection points"])
            }
          })) &&
        caseInsensitivePipeline.status.includes(caseInsensitiveFilterText.status)
      );
    });

    const expandedPipelines = this.state.expandedPipelines;

    return (
      <div className="app" >
        <h1 id='title'>Pipeline Database</h1>
        <table id='pipelines'>
          <Header
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange} />
          <tbody>
            {pipelines.map((pipeline, ppl_idx) => {
              return (
                <RenderPipeline
                  key={pipeline._id}
                  ppl_idx={ppl_idx}
                  state={this.state.pipelines}
                  // a={a}
                  pipeline={pipeline}
                  injectionPointOptions={this.state.injectionPointOptions}
                  expandedPipelines={expandedPipelines}
                  onPipelineClick={() => this.handlePipelineClick(pipeline._id)}
                  fetchPipelines={this.fetchPipelines} />
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default PipelineDatabase;