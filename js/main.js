/**
 * Example of Require.js bootstrap javascript
 */
requirejs.config({
    // Path mappings for the logical module names
    paths: {
        'knockout': 'libs/knockout/knockout-3.3.0',
        'jquery': 'libs/jquery/jquery-2.1.3.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
        'ojs': 'libs/oj/v1.1.2/min',
        'ojL10n': 'libs/oj/v1.1.2/ojL10n',
        'ojtranslations': 'libs/oj/v1.1.2/resources',
        'signals': 'libs/js-signals/signals.min',
        'crossroads': 'libs/crossroads/crossroads.min',
        'text': 'libs/require/text',
        'promise': 'libs/es6-promise/promise-1.0.0.min',
        'hammerjs': 'libs/hammer/hammer-2.0.4.min'
    },
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'crossroads': {
            deps: ['signals'],
            exports: 'crossroads'
        }
  },
    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/myTranslations'
            }
        }
    }
});

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback.
 *
 * For a listing of which JET component modules are required for each component, see the specific component
 * demo pages in the JET cookbook.
 */
var viewModel = {};

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
         'ojs/ojchart', 'ojs/ojvalidation', 'ojs/ojgauge'], // add additional JET components to the end of this list as needed
  function(oj, ko, $) // this callback gets executed when all required modules are loaded
  {
    function ViewModel() {
      var self = this;

      self.inputEmail = ko.observable('ABC');
      self.gaugeValue = ko.observable(50);
      this.value1 = ko.observable(0);
      this.value2 = ko.observable(0);
      this.value5 = ko.observable(0);
      this.thresholdValues = [{max: 33}, {max: 67}, {}]
		  
		      this.gauge4OptionChange  =  function(e, data) {
				if(data.option === "value") {
					$("#FrontTempBrake").attr('title', "Value: " + Math.round(data['value']) + "<br>Thresholds: Low 33, Medium 67, High 100");
					$("#FrontTempBrake").ojStatusMeterGauge('refresh');
				}
		      };
                      
                      this.gauge4OptionChange  =  function(e, data) {
				if(data.option === "value") {
					$("#BackTempBrake").attr('Back Temperature Brake', "Value: " + Math.round(data['value']) + "<br>Thresholds: Low 33, Medium 67, High 100");
					$("#BackTempBrake").ojStatusMeterGauge('refresh');
				}
		      };
                      
                      this.gauge5OptionChange = function(e, data) {
                if (data.option == "value") {
                  $("#gauge5").attr('title', "Value: " + Math.round(data['value']) + "<br>Thresholds: Low 33, Medium 67, High 100");
                  $("#gauge5").ojStatusMeterGauge('refresh');
                                 }
                    };

//      /* chart data */
//      var pieSeries = [{name: "IT_PROG", items: [42]},
//                       {name: "SH_CLERK", items: [55]},
//                       {name: "SA_REP", items: [36]},
//                       {name: "ST_CLERK", items: [10]}];
//
//      self.pieSeriesValue = ko.observableArray(pieSeries);
//
//      var converterFactory = oj.Validation.converterFactory('number');
//      var currencyConverter = converterFactory.createConverter({style: 'currency', currency: 'EUR'});
//      self.numberConverter = ko.observable(currencyConverter);
//
//
//      self.updateChart = function(data) {
//          for (var s = 0; s < data.length; s++) {
//              var jobId = data[s].jobId;
//              var jobAvgSal = data[s].jobAvgSal;
//
//              for (var ss = 0; ss < pieSeries.length; ss++) {
//                  if (pieSeries[ss].name === jobId) {
//                      pieSeries[ss].items[0] = jobAvgSal;
//                      break;
//                  }
//              }
//          }
//
//          self.pieSeriesValue(pieSeries);
//      }
    }

    $(document).ready(
	function() {

            viewModel = new ViewModel();
            ko.applyBindings(viewModel, document.body);
            //ko.applyBindings(new dialGaugeData(), document.getElementById('gauge-container'));
	}
    );
  }
);
